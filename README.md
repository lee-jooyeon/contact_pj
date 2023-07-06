# Phone book 전화번호부 앱 

## 폴더 구조 📁

### apis

Api 요청과 관련된 함수입니다.

    .
    ├── apis
    │   ├── firebase.js
    │   ├── upload.js
    └── ...

### components

필요한 컴포넌트와 페이지 단위로 분리하여 관리합니다.

    .
    ├── ...
    ├── components
    │   ├── Header
    │   ├── ContactItem
    ├── pages
    │   ├── Contact
    │   ├── Detail
    │   ├── NewContact
    │   ├── ...
    └── ...

### hooks

useQuery, useMutation으로 사용하여 개별 hook을 작성합니다.

      .
    ├── ...
    ├── hooks
    │ ├── queries
    │ ├── mutations
    │ ├── useAddContact.js
    │ ├── useDeleteContact.js
    │ ├── useUpdateContact.js
    │ └── ...
    └── ...

## 기술스택 🛠

- **Language :** [Javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- **Package Manager :** [yarn](https://yarnpkg.com/)
- **State Management :** [React Query](https://react-query.tanstack.com/)
- **Styling :** [TailwindCSS](https://tailwindcss.com/)
- **Formatter :** [ESLint](https://eslint.org/)
- **Library :** [axios](https://axios-http.com/)


## 개발과 함께 공부👩‍💻
[🗝️ 카카오 소셜 로그인](https://www.notion.so/834e6a787dc942bebc9db7d67dff49fa?pvs=4)


[🛠️ react-query 뜯어보기](https://www.notion.so/React-Query-e515ea84ebcb4678a8667fed073548ef?pvs=4)



