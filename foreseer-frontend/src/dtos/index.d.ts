export interface CreateMarketDto {
  name: string;
  description: string;
  expiration: string;
  resolutionOracleFeedType: string;
  websiteUrl?: string;
  priceFeedAddress?: string;
}
