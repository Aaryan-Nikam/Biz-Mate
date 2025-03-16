
// Homeowner ROI calculation
export const calculateHomeownerROI = (data: HomeownerData): HomeownerResult => {
  const {
    installationCost,
    annualSavings,
    maintenanceFee,
    interestRate,
    loanTerm,
    energyPriceIncrease,
    rebatesAndIncentives
  } = data;

  // Calculate monthly payment if financing
  const monthlyPayment = loanTerm > 0 
    ? calculateMonthlyPayment(installationCost - rebatesAndIncentives, interestRate, loanTerm) 
    : 0;

  // Calculate annual maintenance
  const annualMaintenance = maintenanceFee;

  // Calculate first year ROI
  const firstYearCost = loanTerm > 0 
    ? monthlyPayment * 12 + annualMaintenance 
    : installationCost - rebatesAndIncentives + annualMaintenance;
  
  const firstYearSavings = annualSavings;
  const firstYearNetSavings = firstYearSavings - firstYearCost;
  const firstYearROI = loanTerm > 0 
    ? (firstYearSavings / (monthlyPayment * 12)) * 100 
    : (firstYearSavings / (installationCost - rebatesAndIncentives)) * 100;

  // Calculate breakeven point (in months)
  const monthlySavings = annualSavings / 12;
  const monthlyMaintenance = annualMaintenance / 12;
  
  let breakEvenMonths = 0;
  let cumulativeSavings = 0;
  let initialInvestment = loanTerm > 0 ? 0 : installationCost - rebatesAndIncentives;

  while (cumulativeSavings < initialInvestment && breakEvenMonths < 360) { // Max 30 years
    cumulativeSavings += monthlySavings - monthlyMaintenance - (loanTerm > 0 ? monthlyPayment : 0);
    breakEvenMonths++;
  }

  // Calculate 10-year projections
  const yearlyProjections = [];
  let cumulativeReturn = -initialInvestment;
  
  for (let year = 1; year <= 10; year++) {
    const adjustedAnnualSavings = annualSavings * Math.pow(1 + (energyPriceIncrease / 100), year - 1);
    const yearlyPayment = loanTerm > 0 && year <= loanTerm ? monthlyPayment * 12 : 0;
    const yearlyReturn = adjustedAnnualSavings - yearlyPayment - annualMaintenance;
    
    cumulativeReturn += yearlyReturn;
    
    yearlyProjections.push({
      year,
      annualSavings: adjustedAnnualSavings,
      annualCost: yearlyPayment + annualMaintenance,
      netSavings: yearlyReturn,
      cumulativeReturn,
      roi: (yearlyReturn / (initialInvestment > 0 ? initialInvestment : yearlyPayment)) * 100
    });
  }

  return {
    monthlyPayment,
    annualMaintenance,
    firstYearNetSavings,
    firstYearROI,
    breakEvenMonths,
    yearlyProjections,
    totalSavings: cumulativeReturn,
    totalCost: initialInvestment + (loanTerm > 0 ? monthlyPayment * 12 * loanTerm : 0) + annualMaintenance * 10
  };
};

// Service Provider ROI calculation
export const calculateProviderROI = (data: ProviderData): ProviderResult => {
  const {
    overheadCosts,
    laborExpenses,
    marketingSpend,
    revenuePerJob,
    jobsPerMonth,
    closingRate,
    leadCost,
    otherExpenses
  } = data;

  // Monthly calculations
  const monthlyRevenue = revenuePerJob * jobsPerMonth;
  const monthlyLeadCost = (jobsPerMonth / (closingRate / 100)) * leadCost;
  const monthlyTotalExpenses = overheadCosts + laborExpenses + marketingSpend + monthlyLeadCost + otherExpenses;
  const monthlyProfit = monthlyRevenue - monthlyTotalExpenses;
  const monthlyROI = (monthlyProfit / monthlyTotalExpenses) * 100;

  // Annual calculations
  const annualRevenue = monthlyRevenue * 12;
  const annualTotalExpenses = monthlyTotalExpenses * 12;
  const annualProfit = monthlyProfit * 12;
  const annualROI = monthlyROI;

  // Calculate 5-year projections
  const yearlyProjections = [];
  const growthRate = 0.05; // Assume 5% annual growth by default
  
  for (let year = 1; year <= 5; year++) {
    const growthFactor = Math.pow(1 + growthRate, year - 1);
    const yearlyRevenue = annualRevenue * growthFactor;
    const yearlyExpenses = annualTotalExpenses * growthFactor;
    const yearlyProfit = yearlyRevenue - yearlyExpenses;
    const yearlyROI = (yearlyProfit / yearlyExpenses) * 100;
    
    yearlyProjections.push({
      year,
      revenue: yearlyRevenue,
      expenses: yearlyExpenses,
      profit: yearlyProfit,
      roi: yearlyROI
    });
  }

  // Calculate key metrics
  const costPerJob = monthlyTotalExpenses / jobsPerMonth;
  const profitPerJob = revenuePerJob - costPerJob;
  const profitMargin = (profitPerJob / revenuePerJob) * 100;
  const breakevenJobs = monthlyTotalExpenses / revenuePerJob;

  return {
    monthlyRevenue,
    monthlyTotalExpenses,
    monthlyProfit,
    monthlyROI,
    annualRevenue,
    annualTotalExpenses,
    annualProfit,
    annualROI,
    costPerJob,
    profitPerJob,
    profitMargin,
    breakevenJobs,
    yearlyProjections
  };
};

// Helper function to calculate monthly loan payment
const calculateMonthlyPayment = (principal: number, interestRate: number, termYears: number): number => {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;
  
  if (monthlyRate === 0) return principal / numPayments;
  
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
};

// Types
export interface HomeownerData {
  installationCost: number;
  annualSavings: number;
  maintenanceFee: number;
  interestRate: number;
  loanTerm: number;
  energyPriceIncrease: number;
  rebatesAndIncentives: number;
}

export interface HomeownerResult {
  monthlyPayment: number;
  annualMaintenance: number;
  firstYearNetSavings: number;
  firstYearROI: number;
  breakEvenMonths: number;
  yearlyProjections: {
    year: number;
    annualSavings: number;
    annualCost: number;
    netSavings: number;
    cumulativeReturn: number;
    roi: number;
  }[];
  totalSavings: number;
  totalCost: number;
}

export interface ProviderData {
  overheadCosts: number;
  laborExpenses: number;
  marketingSpend: number;
  revenuePerJob: number;
  jobsPerMonth: number;
  closingRate: number;
  leadCost: number;
  otherExpenses: number;
}

export interface ProviderResult {
  monthlyRevenue: number;
  monthlyTotalExpenses: number;
  monthlyProfit: number;
  monthlyROI: number;
  annualRevenue: number;
  annualTotalExpenses: number;
  annualProfit: number;
  annualROI: number;
  costPerJob: number;
  profitPerJob: number;
  profitMargin: number;
  breakevenJobs: number;
  yearlyProjections: {
    year: number;
    revenue: number;
    expenses: number;
    profit: number;
    roi: number;
  }[];
}
