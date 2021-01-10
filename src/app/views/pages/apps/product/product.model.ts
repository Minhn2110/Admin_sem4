export class Product {
  name: String;
  partnerId: Number;
  code: String;
  detailedDescription: String;
  productCategoryId: Number;
  genderApply: String;
  priceObj: Number;
  shortDescription: String;
  effectiveDateRangeSelectionNumber: Number; 
  // Imange and PDF
  insuredRule: any;
  avatarImage: any;
  bannerImage: any;
  targetGroupId?: any;




  
}

export class ProductFormBuilderModel {
  formControlName: string;
  placeholder: string;
  error: string;
  hint: string;
}