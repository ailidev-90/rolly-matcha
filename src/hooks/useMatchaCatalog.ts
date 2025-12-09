import { useEffect, useState } from "react";
import {
  RollyClient,
  ProductService,
  BusinessService,
  type Product,
  type BusinessData,
} from "@rolly_ecommerce/rolly-api-client";

type UseMatchaCatalogParams = {
  businessId: string;
  domain: string;
};

type MatchaCatalogState = {
  loading: boolean;
  error: string | null;
  products: Product[];
  business: BusinessData | null;
};

export function useMatchaCatalog({
  businessId,
  domain
}: UseMatchaCatalogParams): MatchaCatalogState {
  const [state, setState] = useState<MatchaCatalogState>({
    loading: true,
    error: null,
    products: [],
    business: null,
  });

  useEffect(() => {
    if (!businessId) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Business ID belum diatur",
      }));
      return;
    }

    let isCancelled = false;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const client = new RollyClient();
        const productService = new ProductService(client);
        const businessService = new BusinessService(client);

        productService.setBusinessId(businessId);

        const [productsResponse, businessResponse] = await Promise.all([
          productService.getAllProducts(),
          businessService.getBusinessDataByDomain(
            `${domain}.withrolly.com`,
          ),
        ]);

        if (isCancelled) return;

        const rawProducts = productsResponse.data as any;
        let products: Product[] = [];

        if (Array.isArray(rawProducts)) {
          products = rawProducts as Product[];
        } else if (rawProducts && Array.isArray(rawProducts.products)) {
          products = rawProducts.products as Product[];
        } else if (
          rawProducts &&
          Array.isArray((rawProducts as any).items)
        ) {
          products = (rawProducts as any).items as Product[];
        } else if (
          rawProducts &&
          Array.isArray((rawProducts as any).result?.data)
        ) {
          products = (rawProducts as any).result.data as Product[];
        }

        const business = businessResponse.data as BusinessData;

        setState({
          loading: false,
          error: null,
          products,
          business,
        });
      } catch (err: unknown) {
        if (isCancelled) return;

        const message =
          err instanceof Error
            ? err.message
            : "Gagal memuat data katalog";

        setState({
          loading: false,
          error: message,
          products: [],
          business: null,
        });
      }
    };

    void fetchData();

    return () => {
      isCancelled = true;
    };
  }, [businessId]);

  return state;
}
