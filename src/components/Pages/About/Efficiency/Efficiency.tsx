import React from "react";
import s from "./Efficiency.module.css";
import Image from "next/image";

const Efficiency = () => {
	return (
		<section className={s.sectionEfficiency}>
			<div className="container">
				<div className={s.EfficiencyWrapper}>
					<h2 className={s.title}>Ефективність, перевірена природою</h2>
					<div className={s.content}>
						<div className={s.text}>
							“Зерива” понад 12 років розробляє та впроваджує ефективні
							біологічні препарати для сільського господарства. Компанія
							допомагає аграріям підвищувати продуктивність посівів, зменшувати
							залежність від хімічних засобів і зберігати родючість ґрунтів.{" "}
							<br />
							<br />
							Біопрепарати Zeryva створюються на основі власних біотехнологічних
							розробок і спрямовані на посилення ключових етапів виробництва.
							Рішення забезпечують стабільний результат у полі навіть за
							складних умов. <br />
							<br />
							Формули постійно вдосконалюються та адаптуються до кліматичних
							умов України. Біологічні технології гармонійно поєднуються з
							традиційними системами живлення й захисту, допомагаючи аграріям
							досягати надійних результатів і підвищувати продуктивність
							виробництва.
						</div>
						<div className={s.imageWrapper}>
							<Image
								src="/Page/About/prob.webp"
								fill
								sizes="100vw"
								alt="img_prob"
								className={s.image}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Efficiency;
