# BookLog ERD

JPA Entity 기준 (진실은 코드).

```mermaid
erDiagram
    USER ||--o{ LOG : writes
    BOOK ||--o{ LOG : "logged in"
    BOOK ||--|| STATISTICS : has
    CATEGORY ||--o{ CATEGORY : "parent-child"
    CATEGORY ||--o{ BOOK : categorizes

    USER {
        string id PK "UUID"
        string username
        enum gender
        enum ageGroup
        string oauthId UK
        enum oauthProvider
        string oauthToken
        string refreshToken
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }

    BOOK {
        string id PK "UUID"
        string title
        string author
        string publisher
        string coverUrl
        int categoryId "논리 FK만, JPA 관계 없음"
    }

    CATEGORY {
        int id PK "알라딘 제공"
        string name
        int parent_id FK "self-ref"
    }

    LOG {
        string id PK "UUID"
        string user_id FK
        string book_id FK
        float rating
        string quote
        text content
        boolean visibility
        date startDate
        date endDate
        datetime createdAt
        datetime updatedAt
    }

    STATISTICS {
        string book_id PK_FK "OneToOne MapsId"
        int logCount
        double averageRating
    }
```

## 알려진 이슈

- `Book.categoryId` — JPA `@ManyToOne` 없이 Integer로만 참조. 관계 매핑 필요.
