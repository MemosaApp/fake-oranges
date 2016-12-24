<a name="sequential"></a>

## sequential()
sequential

Add a sequential type, basically passes through a number with a given
offset.

- `sequential.string` will return a stringified version of the sequential number
- `sequential.offset(x)` will bind sequential with an offset

Usage in fake-oranges:

```
const schema = {
  id: sequential.offset(10).string,
};
```

**Kind**: global function  
