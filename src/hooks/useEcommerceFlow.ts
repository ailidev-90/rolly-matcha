import { useCallback, useState } from "react";
import { RollyClient, ProductService } from "@rolly_ecommerce/rolly-api-client";

type UseEcommerceFlowParams = {
  businessId: string;
  productSlug: string;
  quantity?: number;
  discountCode?: string;
};

type EcommerceFlowState = {
  loading: boolean;
  error: string | null;
  orderNumber: string | null;
};

export function useEcommerceFlow({
  businessId,
  productSlug,
  quantity = 1,
  discountCode,
}: UseEcommerceFlowParams): {
  loading: boolean;
  error: string | null;
  orderNumber: string | null;
  runFlow: () => Promise<void>;
} {
  const [state, setState] = useState<EcommerceFlowState>({
    loading: false,
    error: null,
    orderNumber: null,
  });

  const runFlow = useCallback(async () => {
    // Biarkan RollyClient mengatur API key dan headers sendiri
    // (mengambil dari env / konfigurasi internal package).
    const client = new RollyClient();
    console.log("Client initialized:", client);
    const productService = new ProductService(client);
    console.log("ProductService initialized:", productService);

    setState({ loading: true, error: null, orderNumber: null });

    try {
      productService.setBusinessId(businessId);

      // 1. Get product details
      const productDetails = await productService.getProductDetailsByPath(
        productSlug,
      );
      const product = productDetails.data.products[0];

      if (!product) {
        throw new Error("Produk tidak ditemukan");
      }

      // 2. Get shipping methods
      const shippingMethods = await productService.getShippingMethods();
      const selectedShipping = shippingMethods.data.result.data[0];

      if (!selectedShipping) {
        throw new Error("Metode pengiriman tidak tersedia");
      }

      // 3. Create cart
      const cartResponse = await productService.guestAnonymousCart({
        p_cart_information: [
          {
            product_id: product.id,
            quantity,
          },
        ],
      });

      const order = cartResponse.data.result;

      // 4. Get payment methods
      await productService.getPaymentMethods(order.id);

      // 5. Apply discount (optional)
      if (discountCode) {
        try {
          await productService.applyDiscount(discountCode, order.id);
        } catch (error) {
          console.log("No valid discount code", error);
        }
      }

      setState({
        loading: false,
        error: null,
        orderNumber: order.order_number ?? null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";

      setState({
        loading: false,
        error: message,
        orderNumber: null,
      });
    }
  }, [businessId, productSlug, quantity, discountCode]);

  return {
    loading: state.loading,
    error: state.error,
    orderNumber: state.orderNumber,
    runFlow,
  };
}
