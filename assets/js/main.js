// swiper
const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

// tab_contents 내용 변경 / content_header 내용 변경
const tabMenu = document.querySelectorAll(".tab_menu");
const tabContents = document.querySelectorAll(".tab_contents");
const contentHeaderWrap = document.querySelectorAll(".content_header_wrap");

document.querySelectorAll(".tab_contents_wrap").forEach((wrap) => {
  const tabs = wrap.querySelectorAll(".tab_menu");
  const contents = wrap.querySelectorAll(".tab_contents");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // 클릭한 탭 활성화
      tab.classList.add("active");
      contents[index].classList.add("active");
    });
  });
});

const url = "/assets/data/weather.json";

// 날씨
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
    console.log("test");

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
