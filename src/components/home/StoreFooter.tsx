import Link from "next/link";

type StoreFooterProps = {
  businessName: string;
};

export function StoreFooter({ businessName }: StoreFooterProps) {
  return (
    <footer className="mt-6 rounded-3xl bg-[#EAF3E4] px-6 py-4 text-xs text-[#4A6B4A]">
      <p className="font-medium text-[#1F3D2B]">
        {businessName}
      </p>
      <p className="mt-1 space-x-1">
        <Link
          href="/terms"
          className="hover:underline"
        >
          Term Condition
        </Link>
        <span>·</span>
        <Link
          href="/privacy-policy"
          className="hover:underline"
        >
          Privacy Policy
        </Link>
        <span>·</span>
        <Link
          href="/shipping-policy"
          className="hover:underline"
        >
          Shipping Policy
        </Link>
      </p>
    </footer>
  );
}

