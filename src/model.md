# Paths

> `Private Paths:` 

  - **Personal** 
    - __Notes_
    - __saved Passwords_
    - __Bookmarks_
  - **Peers**
    - __Messages_

> `Public Paths:`
  - *Posts
    - _*Public_
    - _*Peers_
  - *Memes
  - *News

---

# Schemas
`Users: [Public Space]`
```
{
    alias: string;
    pub: string;
    country: string;
}
```

`Posts [Public Space]`
```
{
    id: string;
    post: string;
    author: string;
    likes: number;
    numReported: number;
    category: string;
}
```

`Followers`
```
{
    alias: string;
    timestamp: string;
    pub: string;
}
```

`Following`
```
 {
    alias: string;
    timestamp: string;
    pub: string;
}   
```

`ILiked`
```
{
    *postId: string;
    timestamp: string;
}
```

`TheyLiked`
```
{
    *postId: string;
    alias: string;
    timestamp: string;
}
```