
export interface RelationshipActionResult {
  success: boolean;
  message: string;
  effects: {
    happiness?: number;
    wealth?: number;
    health?: number;
    relationships?: number;
  };
  newRelationshipQuality?: number;
}

export interface RelationshipCreationResult {
  success: boolean;
  message: string;
  newPartner?: any;
  newFriends?: any[];
}
