export interface IReview {
  username: string
  productId: string
  rating: number
  review?: string
  images?: string[]
}

export interface IReviewFull extends IReview {
  _id: string
  createdAt: string
  updatedAt: string
}