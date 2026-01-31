"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
	children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const portalRoot = document.getElementById("modal-root");
	if (!portalRoot) return null;

	return createPortal(children, portalRoot);
};

export default Portal;
