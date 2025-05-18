import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import { OrderForm } from "./OrderForm";

export default function OrderPage() {

  return (
    <ProtectedRoute>
      <div className="p-2 md:p-4 w-full">
      <OrderForm />
      </div>
    </ProtectedRoute>
  )
}