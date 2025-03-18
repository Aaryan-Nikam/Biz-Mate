
export interface QuoteEstimateResult {
  totalCost: number;
  monthlyPayment: number;
  paybackPeriod: number;
  roi: number;
  savings: number;
  insights: string[];
  chartData: any[];
}

export const calculateSolarQuote = (data: any): QuoteEstimateResult => {
  const { systemSize, roofType, sunExposure, electricBill, financing } = data;
  
  // Basic calculations for solar quote
  const costPerWatt = 2.8; // Average cost per watt in $
  const totalCost = systemSize * 1000 * costPerWatt;
  const federalTaxCredit = totalCost * 0.26; // 26% federal tax credit
  const netCost = totalCost - federalTaxCredit;
  
  // Calculate monthly payment if financing
  const interestRate = financing === "loan" ? 0.049 : 0; // 4.9% for loans
  const loanTerm = financing === "loan" ? 20 : 0; // 20 years
  const monthlyPayment = financing === "loan" 
    ? (netCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
      (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1)
    : 0;
  
  // Calculate energy production and savings
  const exposureFactor = sunExposure === "full" ? 1 : sunExposure === "partial" ? 0.8 : 0.6;
  const monthlyProduction = systemSize * 120 * exposureFactor; // kWh per month
  const electricityRate = 0.15; // $ per kWh
  const monthlySavings = monthlyProduction * electricityRate;
  const annualSavings = monthlySavings * 12;
  
  // Calculate ROI and payback period
  const roi = (annualSavings / netCost) * 100;
  const paybackPeriod = netCost / annualSavings;
  
  // Generate insights based on the data
  const insights = [
    `Your ${systemSize}kW solar system could produce approximately ${Math.round(monthlyProduction)} kWh monthly.`,
    `Expected monthly savings on your electricity bill: $${Math.round(monthlySavings)}.`,
    `With ${financing === "loan" ? "financing" : "cash payment"}, you can expect to break even in ${Math.round(paybackPeriod * 10) / 10} years.`,
    `Solar panels typically last 25-30 years, offering about ${Math.round((25 - paybackPeriod) * annualSavings)} in total savings after payback.`,
    roofType === "metal" ? "Metal roofs are ideal for solar installation and may increase efficiency." : 
      "Your asphalt roof is compatible with standard solar mounting systems."
  ];
  
  // Generate chart data for visualization
  const chartData = [
    { 
      category: "Total System Cost", 
      value: Math.round(netCost)
    },
    { 
      category: "Federal Tax Credit", 
      value: Math.round(federalTaxCredit)
    },
    { 
      category: "Annual Savings", 
      value: Math.round(annualSavings)
    }
  ];
  
  // Add year-by-year data for savings chart
  const yearlyData = Array.from({ length: 10 }, (_, i) => ({
    year: i + 1,
    savings: Math.round(annualSavings * (i + 1)),
    investment: i === 0 ? Math.round(netCost) : 0
  }));
  
  return {
    totalCost: Math.round(netCost),
    monthlyPayment: Math.round(monthlyPayment),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    roi: Math.round(roi * 10) / 10,
    savings: Math.round(annualSavings),
    insights,
    chartData: [...chartData, ...yearlyData]
  };
};

export const calculateHVACQuote = (data: any): QuoteEstimateResult => {
  const { systemType, homeSize, existingSystem, seasonalUsage, zones } = data;
  
  // Base costs for different system types
  const baseCosts = {
    central: 5000,
    heatPump: 7500,
    ductless: 4000,
    geothermal: 20000
  };
  
  // Calculate total cost based on system type, home size, and zones
  const systemBaseCost = baseCosts[systemType as keyof typeof baseCosts] || 5000;
  const sizeFactor = homeSize / 1000; // Cost factor based on square footage
  const zoneFactor = zones > 1 ? (1 + (zones - 1) * 0.3) : 1; // Multi-zone factor
  
  let totalCost = systemBaseCost * sizeFactor * zoneFactor;
  
  // Adjust for existing system replacement
  if (existingSystem === "old") {
    totalCost *= 0.9; // 10% discount for replacing old system
  } else if (existingSystem === "none") {
    totalCost *= 1.15; // 15% premium for new installation
  }
  
  // Calculate energy savings
  const usageFactor = seasonalUsage === "high" ? 0.4 : seasonalUsage === "medium" ? 0.25 : 0.15;
  const annualEnergyCost = homeSize * 1.2; // Rough estimate of annual energy cost
  const annualSavings = annualEnergyCost * usageFactor;
  
  // Calculate ROI and payback
  const roi = (annualSavings / totalCost) * 100;
  const paybackPeriod = totalCost / annualSavings;
  
  // Monthly payment (assuming 7-year financing at 5.9% interest)
  const interestRate = 0.059;
  const loanTerm = 7;
  const monthlyPayment = (totalCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
    (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1);
  
  // Generate insights
  const insights = [
    `A ${systemType} HVAC system for your ${homeSize} sq. ft. home could save approximately $${Math.round(annualSavings)} annually.`,
    `Modern HVAC systems are 30-50% more efficient than systems manufactured 10-15 years ago.`,
    `With ${zones} zone${zones > 1 ? 's' : ''}, you'll have better temperature control and potential for additional energy savings.`,
    `Most HVAC systems have a lifespan of 15-20 years with proper maintenance.`,
    `Regular maintenance can extend system life and maintain efficiency, costing $150-$300 annually.`
  ];
  
  // Generate chart data
  const chartData = [
    { 
      category: "Equipment Cost", 
      value: Math.round(totalCost * 0.6)
    },
    { 
      category: "Installation", 
      value: Math.round(totalCost * 0.3)
    },
    { 
      category: "Permits & Fees", 
      value: Math.round(totalCost * 0.1)
    }
  ];
  
  // Add year-by-year data
  const yearlyData = Array.from({ length: 10 }, (_, i) => ({
    year: i + 1,
    savings: Math.round(annualSavings * (i + 1)),
    investment: i === 0 ? Math.round(totalCost) : 0
  }));
  
  return {
    totalCost: Math.round(totalCost),
    monthlyPayment: Math.round(monthlyPayment),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    roi: Math.round(roi * 10) / 10,
    savings: Math.round(annualSavings),
    insights,
    chartData: [...chartData, ...yearlyData]
  };
};

export const calculateRemodelingQuote = (data: any): QuoteEstimateResult => {
  const { projectType, squareFootage, materialsGrade, complexity, timeframe } = data;
  
  // Base costs per square foot for different project types
  const baseCostsPerSqFt = {
    kitchen: 150,
    bathroom: 250,
    basement: 50,
    addition: 200,
    wholehome: 100
  };
  
  // Material grade multipliers
  const materialMultipliers = {
    economy: 0.8,
    mid: 1.0,
    luxury: 1.5,
    premium: 2.2
  };
  
  // Complexity multipliers
  const complexityMultipliers = {
    simple: 0.85,
    medium: 1.0,
    complex: 1.3,
    custom: 1.6
  };
  
  // Timeframe multipliers (rush jobs cost more)
  const timeframeMultipliers = {
    extended: 0.9,
    standard: 1.0,
    expedited: 1.2,
    rush: 1.4
  };
  
  // Calculate total cost
  const baseCostPerSqFt = baseCostsPerSqFt[projectType as keyof typeof baseCostsPerSqFt] || 100;
  const materialMultiplier = materialMultipliers[materialsGrade as keyof typeof materialMultipliers] || 1.0;
  const complexityMultiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers] || 1.0;
  const timeframeMultiplier = timeframeMultipliers[timeframe as keyof typeof timeframeMultipliers] || 1.0;
  
  const totalCost = squareFootage * baseCostPerSqFt * materialMultiplier * complexityMultiplier * timeframeMultiplier;
  
  // Calculate property value increase (ROI for remodeling)
  const valueIncreaseRates = {
    kitchen: 0.7, // 70% of cost recouped at resale
    bathroom: 0.65,
    basement: 0.75,
    addition: 0.65,
    wholehome: 0.6
  };
  
  const valueIncreaseRate = valueIncreaseRates[projectType as keyof typeof valueIncreaseRates] || 0.6;
  const propertyValueIncrease = totalCost * valueIncreaseRate;
  
  // Calculate ROI and monthly financing
  const roi = (propertyValueIncrease / totalCost) * 100;
  
  // Assume 10-year home improvement loan at 6.5% interest
  const interestRate = 0.065;
  const loanTerm = 10;
  const monthlyPayment = (totalCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
    (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1);
  
  // Generate insights
  const insights = [
    `Your ${projectType} remodeling project could increase your property value by approximately $${Math.round(propertyValueIncrease)}.`,
    `${projectType.charAt(0).toUpperCase() + projectType.slice(1)} remodels typically recoup ${Math.round(valueIncreaseRate * 100)}% of costs at resale.`,
    `${materialsGrade.charAt(0).toUpperCase() + materialsGrade.slice(1)}-grade materials balance quality and cost for this project type.`,
    `Based on ${complexity} complexity, labor costs account for approximately ${Math.round(totalCost * 0.4)} of your total budget.`,
    `Consider setting aside 10-15% of your budget ($${Math.round(totalCost * 0.15)}) for unexpected issues.`
  ];
  
  // Generate chart data for value comparison
  const chartData = [
    { 
      category: "Project Cost", 
      value: Math.round(totalCost)
    },
    { 
      category: "Property Value Increase", 
      value: Math.round(propertyValueIncrease)
    },
    { 
      category: "Materials", 
      value: Math.round(totalCost * 0.4)
    },
    { 
      category: "Labor", 
      value: Math.round(totalCost * 0.4)
    },
    { 
      category: "Design & Permits", 
      value: Math.round(totalCost * 0.1)
    },
    { 
      category: "Contingency", 
      value: Math.round(totalCost * 0.1)
    }
  ];
  
  return {
    totalCost: Math.round(totalCost),
    monthlyPayment: Math.round(monthlyPayment),
    paybackPeriod: Infinity, // Remodeling doesn't have a traditional payback period
    roi: Math.round(roi * 10) / 10,
    savings: Math.round(propertyValueIncrease), // This is actually property value increase
    insights,
    chartData
  };
};
