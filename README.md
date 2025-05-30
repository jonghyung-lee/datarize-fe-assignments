# Datarize Frontend 과제 전형

안녕하세요, 지원자님. Datarize Frontend Developer 서류 전형에 합격하신 것을 축하드립니다.  
본 과제는 수신 후 24시간 동안 풀어주시면 됩니다.

## 정책서

쇼핑몰 구매 데이터 대시보드 애플리케이션

### 과제 개요

지원자님은 쇼핑몰의 구매 데이터를 시각화하고 분석할 수 있는 간단한 대시보드 애플리케이션을 개발하게 됩니다.  
이 애플리케이션은 `7월 한 달` 동안 발생한 구매 데이터를 기반으로 몇 가지 주요 정보를 제공해야 합니다.

**해당 프로젝트는 `node 20.13.1`, `yarn 1.22.22` 버전으로 세팅되었습니다**

**`apps/backend` 폴더 내의 코드는 임의로 수정하지 마세요**  
**문의 사항은 채널로 주시면 답변 드리겠습니다**

**제출 시에는 fork된 본인의 레포지토리 링크를 첨부하여 메일로 회신 주시면 확인하겠습니다 :) (원본 저장소에 PR 금지)**
**README 파일에 프로젝트 설정 및 실행 방법을 포함하세요.**

```cmd
cd apps
yarn install
yarn start-server
yarn start-client
```

### 요구 사항

- 가격대별 구매 빈도 차트

  - 한 달 동안 발생한 구매 데이터를 바탕으로, 각 가격대의 제품이 얼마나 많이 구매되었는지 보여주는 차트를 구현하세요. 가격대는 2만원 이하부터 10만원 이상까지 만원 단위로 구분됩니다. 차트는 바 차트 형태로 시각화되어야 합니다. 날짜를 선택해서 특정 기간을 조회할 수 있도록 구현해주세요.

- 가장 많이 구매한 고객 목록 및 검색 기능

  - 한 달 동안 가장 많이 구매한 고객을 내림차순/오름차순으로 정렬하여 보여주는 목록을 구현하세요. 기본 정렬은 ID입니다. 각 고객의 ID, 이름, 총 구매 횟수, 총 구매 금액을 표시하세요. 고객의 이름을 통해서 검색 가능해야 합니다.

- 고객 ID 기반 상세 기능

  - 특정 고객 Row를 클릭하면 해당 고객의 상세 구매 내역을 표시할 수 있는 기능을 구현하세요. 검색 결과에는 해당 고객의 구매 날짜, 구매한 제품 목록, 각 제품의 가격, 상품 썸네일이 포함되어야 합니다.

### 세부 구현 사항

- 데이터 제공 방식

  - 서버에서 제공되는 API 엔드포인트를 통해 데이터를 가져와야 합니다.
  - API 명세
    1. GET `/api/purchase-frequency` 한 달 동안의 모든 구매 데이터를 반환합니다.
       - 쿼리 파라미터 (optional)
         - from: 시작 날짜 (ISO 8601 형식)
         - to: 종료 날짜 (ISO 8601 형식)
    2. GET `/api/customers` 고객 목록을 반환합니다.
       - 쿼리 파라미터 (optional)
         - sortBy: 정렬 기준 (가능한 값: asc, desc - 구매 금액 순 정렬)
         - name: 이름 검색
    3. GET `/api/customers/{id}/purchases` 특정 고객의 구매 내역을 반환합니다.

- 프론트엔드 기술 스택
  - `apps/frontend` 폴더 안에 미리 React 프로젝트를 세팅해 두었습니다. 이것을 사용하여 애플리케이션을 개발하세요. 상태 관리, 차트 라이브러리, CSS 프레임워크는 기호에 맞게 사용하셔도 좋습니다.

### 기능 요구 사항

데이터는 클라이언트 사이드에서 비동기 요청을 통해 가져와야 합니다. 모든 데이터 요청 및 화면에 대한 로딩 상태와 에러 처리를 구현하세요. 단일 날짜도 조회할 수 있도록 구현해야 합니다.

### 추가 요구 사항

코드의 가독성을 위해 적절한 주석을 추가하세요. 필요한 경우, 유닛 테스트를 작성하여 주요 기능을 검증하세요.
