'use strict';

class TweetScanner {
    constructor(text) {
        this.text = text;
    }

    is_eof() {
        return this.text === '';
    }

    eat() {
        let m = this.text.match(/@\w+|https?:\/\/t.co\/\w+/);
        if (m === null) {
            let ret = [{kind: 'text', value: this.text}];
            this.text = '';
            return ret;
        }

        let ret = [];
        if (m.index !== 0) {
            ret.push({kind: 'text', value: this.text.substr(0, m.index)});
        }

        if (m[0].startsWith('@')) {
            ret.push({kind: 'screen_name', value: m[0]});
        } else if (m[0].startsWith('http')) {
            ret.push({kind: 'url', value: m[0]});
        } else {
            console.log('Invalid match: ' + m[0]);
        }

        this.text = this.text.substring(m[0].length + m.index);
        return ret;
    }

    eat_all() {
        let tokens = [];
        let push = Array.prototype.push;
        while (!this.is_eof()) {
            push.apply(tokens, this.eat());
        }
        return tokens;
    }
}

