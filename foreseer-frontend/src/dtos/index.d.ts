export interface CreateMarketDto {
  name: string;
  description: string;
  expiration: number;
  resolutionOracleFeedType: string;
  websiteUrl?: string;
  priceFeedAddress?: string;
}

export interface UpdateMarketDto {
  name?: string;
  description?: string;
  ammAddress?: string;
}
