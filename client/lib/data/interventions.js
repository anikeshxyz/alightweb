export const interventionsData = {
  "apac-hub": {
    id: "apac-hub",
    location: "Singapore & Shanghai Ports",
    title: "APAC Manufacturing & QA Hub",
    cluster: "APAC Operations",
    heroImage: "/images/bamboo_cluster.png",
    color: "#38bdf8",
    shortDesc: "Coordinating high-volume manufacturing, ISO compliance, and pre-shipment container QA.",
    fullStory: `Our Asia-Pacific hub serves as the operational nerve center for cross-border production, material testing, and rapid export staging. Connecting over 120 certified manufacturing partners across East and Southeast Asia, this hub ensures seamless factory-to-port dispatch.

    Equipped with on-site QA inspection labs, automated packaging lines, and bonded container staging facilities, our APAC operations team handles over 15,000 TEU annually with zero defect tolerance.`,
    impact: [
      { label: "Manufacturing Partners", value: "120+" },
      { label: "Annual TEU Volume", value: "15,000+" },
      { label: "QA Pass Rate", value: "99.8%" }
    ],
    craftDetails: {
      title: "Automated Inspection & Sorting",
      description: "Every shipment undergoes standardized AQL Level II optical sorting, tensile testing, and moisture verification before container loading.",
      material: "Precision Composite & Industrial Grade"
    }
  },
  "sustainable-materials": {
    id: "sustainable-materials",
    location: "Global Sourcing Network",
    title: "Certified Sustainable Materials",
    cluster: "Sustainability Center",
    heroImage: "/images/rug_jharkhand.png",
    color: "#0284c7",
    shortDesc: "Sourcing certified biodegradable fibers, natural composites, and eco-friendly packaging.",
    fullStory: `Our Sustainable Materials initiative guarantees complete traceability across raw material supply chains. By establishing direct contracts with certified forestry, organic cotton growers, and natural fiber processors, we supply enterprise clients with verified ESG-compliant inputs.

    Every material batch comes with digital chain-of-custody documentation, ensuring adherence to EU Green Deal and global environmental standards.`,
    impact: [
      { label: "Eco-Certified Suppliers", value: "85+" },
      { label: "Carbon Offset (MT)", value: "45,000" },
      { label: "Traceability Index", value: "100%" }
    ],
    craftDetails: {
      title: "Eco-Fiber Engineering",
      description: "Low-impact processing techniques utilizing solar-powered washing cycles and closed-loop non-toxic dye extraction.",
      material: "Organic Fibers & Circular Biopolymers"
    }
  },
  "na-logistics": {
    id: "na-logistics",
    location: "North America Gateway",
    title: "Regional Freight & Distribution",
    cluster: "North America Hub",
    heroImage: "/images/moonj_cluster.png",
    color: "#60a5fa",
    shortDesc: "Cross-docking and warehouse partnerships ensuring expedited customs and nationwide distribution.",
    fullStory: `Operating out of primary coastal hubs in Los Angeles and Newark, our North American logistics network provides frictionless import clearing, bonded drayage, and temperature-controlled pallet storage.

    With unified EDI and API integration directly into major domestic retail and fulfillment platforms, we reduce transit dwell times by up to 35%.`,
    impact: [
      { label: "Warehouse Capacity (sq ft)", value: "500K+" },
      { label: "Avg Dwell Time Reduction", value: "35%" },
      { label: "OTIF Delivery", value: "99.2%" }
    ],
    craftDetails: {
      title: "Automated Palletization",
      description: "High-density cross-docking workflows with automated RFID scanning and direct container-to-fleet transfer.",
      material: "Palletized Freight & Bulk Containers"
    }
  },
  "eu-operations": {
    id: "eu-operations",
    location: "Rotterdam & Hamburg Ports",
    title: "European Trade & Compliance Gateway",
    cluster: "European Operations",
    heroImage: "/images/folk_painting.png",
    color: "#38bdf8",
    shortDesc: "Full export documentation, tariff classification, and bonded warehousing across Europe.",
    fullStory: `Our European hub coordinates deepwater vessel unloading, CBAM carbon accounting, and intra-EU rail freight dispatch. Working directly with European customs authorities, we provide pre-cleared freight pathways for our international corporate clientele.`,
    impact: [
      { label: "EU Member Ports", value: "14" },
      { label: "Customs Clearance Time", value: "< 4 hrs" },
      { label: "Carbon Compliance", value: "100%" }
    ],
    craftDetails: {
      title: "Regulatory Pre-Clearance",
      description: "Digital bonded storage systems integrated with EU customs for automated VAT and HS tariff reconciliation.",
      material: "General Cargo & Specialized Freight"
    }
  },
  "global-trade": {
    id: "global-trade",
    location: "Middle East & Africa Hub (Dubai)",
    title: "Transshipment & Free Trade Gateway",
    cluster: "MEA Operations",
    heroImage: "/images/khadi_banner.png",
    color: "#38bdf8",
    shortDesc: "Strategic free trade zone staging connecting Asian production with African and Middle Eastern markets.",
    fullStory: `Situated in the JAFZA trade zone in Dubai, our Middle East hub provides re-export facilitation, tariff exemptions, and rapid multi-modal cargo redistribution between maritime and air corridors.`,
    impact: [
      { label: "Corridor Routes", value: "30+" },
      { label: "Tax Exemption Benefit", value: "100%" },
      { label: "Air-Sea Transfer Time", value: "< 8 hrs" }
    ],
    craftDetails: {
      title: "Bonded Free Zone Handling",
      description: "Zero-tariff transshipment warehousing with 24/7 security and cold-chain containment capabilities.",
      material: "High-Velocity Commercial Cargo"
    }
  },
  // Legacy aliases
  lohardaga: {
    id: "lohardaga",
    location: "Jharkhand Sourcing Hub",
    title: "Regional Textile & Fiber Procurement",
    cluster: "East India Corridor",
    heroImage: "/images/rug_jharkhand.png",
    color: "#38bdf8",
    shortDesc: "High-tensile natural fiber production and structured procurement cluster.",
    fullStory: `Connecting regional producers with international textile supply chains. Our standardized quality protocols and direct supplier contracting provide transparent volume sourcing.`,
    impact: [
      { label: "Supplier Enterprises", value: "200+" },
      { label: "Regional Centers", value: "12" },
      { label: "Volume Growth", value: "45%" }
    ],
    craftDetails: {
      title: "Industrial Fiber Synthesis",
      description: "Structured weaving and fiber treatment meeting international commercial standards.",
      material: "Natural Wool & Reinforced Fiber"
    }
  },
  bodhgaya: {
    id: "bodhgaya",
    location: "Bihar Sourcing Center",
    title: "Sustainable Bamboo & Timber Derivatives",
    cluster: "North India Hub",
    heroImage: "/images/bamboo_cluster.png",
    color: "#38bdf8",
    shortDesc: "Sustainable structural bamboo and commercial eco-packaging materials.",
    fullStory: `Transforming agricultural bamboo resources into industrial packaging and architectural components meeting export grade standards.`,
    impact: [
      { label: "Processing Units", value: "150+" },
      { label: "Quality Certifications", value: "5" },
      { label: "Sustainable Sourcing", value: "100%" }
    ],
    craftDetails: {
      title: "High-Durability Composite Processing",
      description: "Thermal and natural resin treatment for industrial strength and termite resistance.",
      material: "Treated Structural Bamboo"
    }
  },
  sitapur: {
    id: "sitapur",
    location: "Uttar Pradesh Logistics Center",
    title: "Natural Fiber & Composite Materials",
    cluster: "Central Corridor",
    heroImage: "/images/moonj_cluster.png",
    color: "#38bdf8",
    shortDesc: "Organized natural grass harvesting and industrial composite fiber fabrication.",
    fullStory: `Centralizing eco-friendly material harvesting into structured producer collectives with direct factory linkages.`,
    impact: [
      { label: "Producer Groups", value: "18" },
      { label: "Market Access", value: "Global" },
      { label: "Efficiency Gain", value: "65%" }
    ],
    craftDetails: {
      title: "Natural Fiber Splitting & Drying",
      description: "Automated sorting and fiber preparation for commercial woven packaging.",
      material: "Wild Grass & Fiber Composites"
    }
  },
  sualkuchi: {
    id: "sualkuchi",
    location: "Assam Procurement Center",
    title: "Specialty Silk & Textile Processing",
    cluster: "Northeast Corridor",
    heroImage: "/images/khadi_banner.png",
    color: "#38bdf8",
    shortDesc: "High-grade commercial silk weaving and industrial fabric supply.",
    fullStory: `Integrating indigenous silk production with modern high-speed looms for international fashion and home furnishing manufacturers.`,
    impact: [
      { label: "Loom Units", value: "90+" },
      { label: "Annual Output", value: "250K m" },
      { label: "Export Grade", value: "100%" }
    ],
    craftDetails: {
      title: "Precision Weaving",
      description: "Modern loom technology maintaining natural silk luster and tensile consistency.",
      material: "Pure Muga & Eri Silk"
    }
  }
};
