import React, {Component} from 'react';

import './postComment.scss';

export default class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            symbols: 250
        };

        this.textRef = React.createRef();
    }


    render() {

        return (
            <section className='post_comment'>
                <div className='comment'>
                    <textarea
                        onChange={::this.setSymbols}
                        placeholder={this.props.loggedIn
                            ? 'Write a comment'
                            : 'Comments can be post only by registered users'
                        }
                        ref={this.textRef}
                        onKeyDown={::this.keyDown}
                    />
                    <span
                        className={this.state.symbols < 0 ? 'warning' : ''}
                    >
                        {this.state.symbols}
                        </span>
                </div>
                <div className='post'>
                    <button
                        disabled={!this.props.loggedIn || this.state.symbols === 250 || this.state.symbols < 0}
                        onClick={::this.saveComment}
                    >
                        Post
                    </button>
                </div>
            </section>


        )

    }

    /***************************************************************************
     *
     **************************************************************************/

    setSymbols() {
        const textLength = this.textRef.current.value.trim().length;
        const maxLength = 250;

        this.setState({
            symbols: maxLength - textLength
        })
    }

    keyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.saveComment();
        }
    }

    saveComment() {
        const post = this.textRef.current.value.trim();

        const data = {
            news_id: +this.props.articleId,
            text: post,
            pId: 0,
            author: this.props.userName,
            authorId: +this.props.userId,
            ups: 0,
            downs: 0,
            id: +(new Date())
        };


        if (this.props.loggedIn && this.state.symbols < 250 && this.state.symbols >= 0) {
            this.textRef.current.value = '';
            this.textRef.current.blur();
            this.props.onSaveComment(data);

            this.setState({
                symbols: 250
            })
        }


    }

}