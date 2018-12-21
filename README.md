### add user info

post

`/api/users`

request:

```
{
    url:string,
    date:string
}
```

response:

```
{
    msg:'success'
}
```

### query user info

get  
`/api/users`

```
[
    {
        wx_nick_name:'',
        date:'',
        url:'',
       id:string
    }
]
```

### delete user info item

### update user info item

put
`/api/users/:id`
{
date:string,
url:string
}
