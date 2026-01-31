"use client";
import React from "react";
import s from "./BreadCrumbs.module.css";
import Link from "next/link";

type BreadCrumbItem = {
	label: string;
	href?: string;
};

type Props = {
	crumbs: BreadCrumbItem[];
};

const BreadCrumbs: React.FC<Props> = ({ crumbs }) => {
	return (
		<section className={s.sectionBreadCrubs}>
			<div className="container">
				<div className={s.breadWrapper}>
					{crumbs.map((crumb, index) => {
						const isLast = index === crumbs.length - 1;
						return (
							<div key={index} className={s.breadItem}>
								{crumb.href && !isLast ? (
									<>
										<Link href={crumb.href} className={s.firstStep}>
											{crumb.label}
										</Link>
										<div className={s.chevronBlock}>
											<svg className={s.chevronIcon}>
												<use href="/sprite.svg#icon-breadcrumbs-arrow"></use>
											</svg>
										</div>
									</>
								) : (
									<p className={s.nextStep}>{crumb.label}</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default BreadCrumbs;
