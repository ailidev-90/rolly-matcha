"use client";

import { useEffect, useState } from "react";
import {
  RollyClient,
  BusinessService,
  type BusinessMetadata,
} from "@rolly_ecommerce/rolly-api-client";
import { BUSINESS_DOMAIN_SLUG } from "../config/rolly";

type UseBusinessMetadataState = {
  loading: boolean;
  error: string | null;
  metadata: BusinessMetadata | null;
};

export function useBusinessMetadata(): UseBusinessMetadataState {
  const [state, setState] = useState<UseBusinessMetadataState>({
    loading: true,
    error: null,
    metadata: null,
  });

  useEffect(() => {
    let isCancelled = false;

    const fetchMetadata = async () => {
      setState({ loading: true, error: null, metadata: null });

      try {
        const client = new RollyClient();
        const businessService = new BusinessService(client);

        const response = await businessService.getBusinessDataByDomain(
          `${BUSINESS_DOMAIN_SLUG}.withrolly.com`,
        );

        if (isCancelled) return;

        setState({
          loading: false,
          error: null,
          metadata: response.data.metadata,
        });
      } catch (err: unknown) {
        if (isCancelled) return;
        const message =
          err instanceof Error ? err.message : "Gagal memuat data bisnis";
        setState({
          loading: false,
          error: message,
          metadata: null,
        });
      }
    };

    void fetchMetadata();

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
