## 🟢 네이버
- 작업기간: 2025.06 ~ 2025.06
- 기여도: 퍼블리싱 100%
- 사용기술: HTML5, CSS3, JavaScript
- [https://b3lla0.github.io/soorim-clone/](https://b3lla0.github.io/naver-clone/)

```
{
      "강수량": 0,
      "관측소": "서울시 신림동",
      "기온": 24,
      "습도": 55,
      "예측시간": 1,
      "예측일": "2025-07-03",
      "풍속": 2,
      "시간": 3
}
```
```
fetch(url)
  .then((res) => res.json())
  .then((json) => {
    const latest = json.data[json.data.length - 5]; // 최근 정보 불러오기
    const maxTemp = Math.max(...json.data.map((item) => item.기온)); // 최고 기온
    const minTemp = Math.min(...json.data.map((item) => item.기온)); // 최저 기온

    // 값 출력
    document.getElementById("city").textContent = latest["관측소"];
    document.getElementById("temperature").textContent = latest["기온"] + `°`;
    document.getElementById("max_temp").textContent = Math.floor(maxTemp) + `°`;
    document.getElementById("min_temp").textContent = Math.floor(minTemp) + `°`;
    // 날씨 상태
    let condition = "";

    if (latest["기온"] >= 28) {
      condition = "맑음";
    } else if (latest["기온"] >= 23) {
      condition = "맑음";
    } else {
      condition = "흐림";
    }

    document.getElementById("condition").textContent = condition;

    // 최근 기온, 시간 5개 출력
    const recentData = json.data.slice(-5); // 최근 5개 정보
    const listEl = document.getElementById("recent_weather");

    recentData.forEach((item, index) => {
      const timeText = index === 0 ? `${item["시간"]}시` : item["시간"];
      listEl.innerHTML += `<li>${Math.floor(
        item["기온"]
      )}° <span>${timeText}</span></li>`;
    });
  })
  .catch((err) => {
    console.error("날씨 데이터 로드 실패:", err);
  });
```
json 파일을 이용하여 현재 기온, 최고/최저 기온, 상태, 최근 5개 기록을 화면에 표시
