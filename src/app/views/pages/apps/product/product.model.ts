export class Product {
  name: String;
  partnerId: Number;
  code: String;
  insuredRule: File;
  detailedDescription: String;
  productCategotyId: Number;
  genderApply: String;
  bannerImage: File;
  priceObj: Number;
  shortDescription: String;
  avatarImage: File;
  effectiveDateRangeSelectionNumber: Number; 
  
}

export class ProductFormBuilderModel {
  formControlName: string;
  placeholder: string;
  error: string;
  hint: string;
}