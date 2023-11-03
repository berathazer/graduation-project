import React from "react";
import { Button } from "../ui/button";

interface AddBasketButtonProps {
	className?: string;
}
const AddBasketButton = ({ className }: AddBasketButtonProps) => {
	return <Button className={className}>Sepete Ekle</Button>;
};

export default AddBasketButton;
