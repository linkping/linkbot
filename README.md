# linkbot

> IRC bot for #linkping channel on [`Libera Chat`](https://libera.chat). Inspired by [`sudobot`](https://github.com/sudoroom/sudobot).

## Functionality

* `!close` mark the hackerspace as closed (spaceapi will be updated) (op only)
* `!help` prints usage
* `!idea` print random idea in channel
* `!links` tells the user the last posted links
* `!open` mark the hackerspace as opened (spaceapi will be updated) (op only)
* `!ping` the bot pongs back in channel
* `!time [place]` prints the time for a place

## Development

```
$ npm i
$ npm start
```

## Config

Uses [`rc`](https://github.com/dominictarr/rc). Will connect to `##linkpingdev` during development.

## License

This project is licensed under the MIT license - see the [`LICENSE.md`](LICENSE.md) file for details.

