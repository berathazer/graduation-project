"use client";
import { useState, useEffect } from "react";

/// Bu componenti sonra güncelleyeceğim
const UnsavedChangesWarning = () => {
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

	useEffect(() => {
		const handleBeforeUnload = (event: any) => {
			if (hasUnsavedChanges) {
				const message =
					"Sayfadan ayrılmadan önce kaydedilmemiş değişiklikleriniz var. Emin misiniz?";
				event.returnValue = message;
				return message;
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [hasUnsavedChanges]);

	return null;
};

export default UnsavedChangesWarning;
