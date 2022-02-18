import React, { useEffect, useRef } from 'react'

function Card(props) {
	const imgRef = useRef(null)

	useEffect(() => {
		const callback = (entries, observer) => {
			entries.forEach(entry => {
				// isIntersecting 화면안에 이요소가 들어와 있냐 아니냐를 나타나게 하는 값
				if (entry.isIntersecting) {
					const target = entry.target
					const previousSibling = target.previousSibling
					// 화면에 해당 요소로 접근 하면 img src에 data-src값을 넣는다.
					target.src = target.dataset.src;
					previousSibling.srcset = previousSibling.dataset.srcset
					// 지정한 요소를 이미 주시하고 있지 않을 때는 아무것도 수행하지 않으며 예외도 발생하지 않습니다.
					observer.unobserve(target)
				}
			})
		}
		const options = {};
		// lazy load
		const observer = new IntersectionObserver(callback, options);
		observer.observe(imgRef.current)
	}, [])


	return (
		<div className="Card text-center">
			<picture>
				<source data-srcset={props.webp} type="image/webp"></source>
				<img data-src={props.image} alt="" ref={imgRef} />
			</picture>
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
