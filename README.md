# Silencium

Multiplayer kick-ass taboo

## Requirements

* Ruby 1.9
* Bundler
* RabbitMQ (or other AMQP server)

## Using

* eventmachine
* em-websocket
* web-socket-js
* warren
* google font api
* jQuery

## Set up

    bundle install --relock
    git submodule update --init

## Run

    sudo rabbitmq-server
    ruby game.rb "my silencium server" 3001 cards.js
    ruby rooms.rb
    open rooms.html

## Cards format

Cards are stored in a JSON file in following format:

    [
        [word1, [taboo_word1, taboo_word2, taboo_word_n]],
        [word2, [taboo_word1, taboo_word2, taboo_word_n]]
    ]

## License

(The MIT License)

Copyright (c) 2010 Igor Wiedler

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
