<h3 align="center">
  <img src="https://github.com/cagataycali/wordpress-migrate-tool/raw/master/migration.png" alt="logo" />
</h3>

### What is wordpress migrate tool?

I migrated tons of wordpress blog.
It's really painful to do this job.
With this tool you will be able to carry out the transport without pain.

**:zap: That's super simple,**

```bash
npm i -g wordpress-migrate-tool; # Install wpm
wpm; # Init wpm
```

**:turtle: Migrate!**
```bash
wpm migrate db; # Migrate mysql database to remote server
wpm migrate files; # Migrate wordpress files to remote server
```

**:hatching_chick: Thats it.**


**:grey_question: Usage Examples**

<details>


<h3 align="center">
  <img src="https://github.com/cagataycali/wordpress-migrate-tool/raw/master/footer.png" alt="footer" />
</h3>


*Create mysql database in remote server.*
```
wpm mysql create remote
```

*Delete mysql database in remote server.*
```
wpm mysql delete remote
```

*Export mysql database in remote server.*
```
wpm mysql export remote
```

*Import mysql database in remote server.*
```
wpm mysql import remote
```

*Create mysql database in local server.*
```
wpm mysql create local
```

*Delete mysql database in local server.*
```
wpm mysql delete local
```

*Export mysql database in local server.*
```
wpm mysql export local
```

*Import mysql database in local server.*
```
wpm mysql import local
```

*Migrate mysql database to another server.*
```
wpm migrate db
```

*Migrate wordpress files to another server.*
```
wpm migrate db
```

</details>

### License :metal:

MIT © [Çağatay Çalı](https://cagatay.me)
