import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        author: { type: String, required: true },
        publisher: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        slug: { type: String, required: true },
        downloadLink: { type: String, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
      },
    ],
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
export const Order = mongoose.model('Order', orderSchema);
