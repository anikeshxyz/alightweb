import ProductDetails from "@/components/features/products/ProductDetails";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alightintl.com";

async function getProduct(slug) {
  try {
    const res = await fetch(`${API_URL}/api/products/${slug}`, { cache: "no-store" });
    const data = await res.json();
    return data.success && data.data ? data.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const image =
    product.images?.[0] ||
    product.image ||
    `${SITE_URL}/images/og-cover.jpg`;

  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: product.name,
    description:
      product.description?.slice(0, 155) ||
      `Source ${product.name} — certified export quality from Alight International. Material: ${product.material || "Industrial Grade"}.`,
    keywords: [
      product.name,
      product.category,
      product.craft,
      "global trade",
      "wholesale procurement",
      "export quality",
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | Alight International`,
      description:
        product.description?.slice(0, 155) ||
        `Global procurement & export: ${product.name} by Alight International.`,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.name }],
      type: "website",
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = null;
  let similarProducts = [];

  try {
    const res = await fetch(`${API_URL}/api/products/${slug}`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.data) {
      product = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-xl font-bold mt-20">
        Product not found
      </div>
    );
  }

  try {
    const allRes = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
    const allData = await allRes.json();
    if (allData.success && Array.isArray(allData.data)) {
      similarProducts = allData.data
        .filter(
          (p) =>
            p.category === product.category &&
            String(p._id) !== String(product._id)
        )
        .slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch similar products:", error);
  }

  // JSON-LD Product structured data
  const imageUrl =
    product.images?.[0] || product.image
      ? (product.images?.[0] || product.image).startsWith("http")
        ? product.images?.[0] || product.image
        : `${SITE_URL}${product.images?.[0] || product.image}`
      : `${SITE_URL}/images/og-cover.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `Export-grade ${product.name} from Alight International.`,
    image: imageUrl,
    sku: String(product._id),
    brand: {
      "@type": "Brand",
      name: "Alight International",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Alight International",
      },
    },
    countryOfOrigin: {
      "@type": "Country",
      name: product.countryOfOrigin || "Singapore",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} similarProducts={similarProducts} />
    </>
  );
}
