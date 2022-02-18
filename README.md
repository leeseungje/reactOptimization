# 웹 성능 최적화

## 일반 홈페이지 최적화

로딩 성능 최적화

- 크롬 Network 탭
- 크롬 Performance 탭
- 크롬 Lighthouse 탭
- Corverage 탭

### 이미지 레이지(lazy) 로딩

해당 방식을 통해 유저가 보여지지 않는곳에서 미리 렌더링이 되지 않고 보여줬을때 로드를 하게 해서 최초 렌더링 속도 비용을 줄일 수 있는 방법

- 영상과, 이미지가 같이 있을경우 이미지가 로드 > 영상이 로드 되는 방식으로 최초 영상에서 이미지가 로드되기까지 영상이 안나올 수 있다.
- 그래서 유저가 보여지지 않는 이미지들은 `lazy load`를 통해서 영상을 최우선적으로 보여줄 수 있게 만들어 줄수 있다.
- 해당 방법은 `IntersectionObserver()`함수를 통해서 lazy loading 작업을 할 수 있다.

```javascript
import React, { useEffect, useRef } from 'react'

function Card(props) {
  const imgRef = useRef(null)

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        // isIntersecting 화면안에 이요소가 들어와 있냐 아니냐를 나타나게 하는 값
        if (entry.isIntersecting) {
          // 화면에 해당 요소로 접근 하면 img src에 data-src값을 넣는다.
          entry.target.src = entry.target.dataset.src
          // 지정한 요소를 이미 주시하고 있지 않을 때는 아무것도 수행하지 않으며 예외도 발생하지 않습니다.
          observer.unobserve(entry.target)
        }
      })
    }
    const options = {}
    // lazy load
    const observer = new IntersectionObserver(callback, options)
    observer.observe(imgRef.current)
  }, [])

  return (
    <div className="Card text-center">
      <img data-src={props.image} alt="" ref={imgRef} />
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">{props.children}</div>
    </div>
  )
}

export default Card
```

[observer 참고](https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver)

### 이미지 사이즈 최적화

- 이미지 사이즈가 크기 때문에 사이트 사이즈에 맞게 사이즈를 줄이고 용량을 줄이는 방법
- 사이즈를 줄이는 방법은 무궁무진하기 때문에 알아서 줄이는 방법을 택한다.
- [이미지 사이즈 줄이는 페이지](https://tinypng.com/)

#### WEBP

- 구글에서 만들어진 최신 이미지 포맷 방식
- 지원하지 않는 브라우저가 몇 있다.
- 하지만 jpg보다 화질이 뛰어나고 용량이 적다.
- [WEBP이미지 변환 사이트](https://squoosh.app/) 사이즈 조절도 가능 하다.

### 동영상 최적화

### 폰트 최적화(핵심)

### 캐시 최적화(핵심)

### 불필요한 CSS 제거(핵심)
