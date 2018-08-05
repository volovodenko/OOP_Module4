import React, {Component} from 'react';

import './comments.scss';

export default class Comments extends Component {

    constructor(props) {
        super(props);

        const voteArrayFiltered = this.props.commentsList.filter(item => !!item.vote);

        const voteArray = voteArrayFiltered.map(item => (
            {
                id: item.id,
                vote: item.vote
            }
        ));


        this.state = {
            voteArray
        }
    }


    render() {

        return (
            <section className='comments'>
                <p>
                    {
                        this.props.commentsList.length
                        + (this.props.commentSaved ? this.props.savedCommentsList.length : 0 )
                    } comments
                </p>

                <ul>
                    {
                        this.props.commentSaved
                            ? this.commentsList([...this.props.savedCommentsList, ...this.props.commentsList])
                            : this.commentsList(this.props.commentsList)
                    }
                </ul>
            </section>


        )

    }

    /***************************************************************************
     *
     **************************************************************************/

    commentsList(commentsList) {
        return commentsList.map(item => {
            const upExist = this.issetVote(+item.id, 'up');
            const downExist = this.issetVote(+item.id, 'down');

            return (
                <li key={item.id} data-id={item.id}>
                    <div className='author'>
                        Posted by:&nbsp;
                        <a href={`/user/${item.author}-${item.authorId}.html`}>
                            {item.author.charAt(0).toUpperCase() + item.author.slice(1)}
                        </a>
                    </div>
                    <p>{item.text}</p>
                    <div className='info'>
                        <div className='info-left'>

                            <div className='vote'>
                                <div
                                    className={''
                                    + (this.props.loggedIn ? 'ups' : '')
                                    + (this.props.loggedIn && upExist
                                        ? ' active'
                                        : '')
                                    }
                                    onClick={::this.voteUps}
                                >
                                    <i className='fa fa-thumbs-up fa-lg' aria-hidden='true'/>
                                    <span>
                                {
                                    this.props.loggedIn && upExist
                                        ? +item.ups + 1
                                        : +item.ups
                                }
                                </span>
                                </div>
                            </div>

                            <div className='vote'>
                                <div
                                    className={''
                                    + (this.props.loggedIn ? 'downs' : '')
                                    + (this.props.loggedIn && downExist
                                        ? ' active'
                                        : '')
                                    }
                                    onClick={::this.voteDown}
                                >
                                    <i className='fa fa-thumbs-down fa-lg' aria-hidden='true'/>
                                    <span>
                                    {
                                        this.props.loggedIn && downExist
                                            ? +item.downs + 1
                                            : +item.downs
                                    }
                                </span>
                                </div>
                            </div>

                        </div>

                        <div className='info-right'>
                            <div className={'reply' + (this.props.loggedIn ? ' active' : '')}>
                                <i className='fa fa-reply fa-lg' aria-hidden='true'/>
                                <span>Reply</span>
                            </div>
                        </div>
                    </div>
                </li>
            )
        });
    }


    voteUps(e) {
        const commentId = +e.currentTarget
            .parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');

        let data;

        const upExist = this.issetVote(commentId, 'up');

        data = upExist
            ? {vote: 'veto', id: commentId}
            : {vote: 'up', id: commentId};

        this.props.onChangeVote(data);

        const voteArrayFiltered = this.state.voteArray.filter(item => +item.id !== commentId);

        this.setState(
            {
                voteArray: upExist ? [...voteArrayFiltered] : [...voteArrayFiltered, data]
            }
        )

    }

    voteDown(e) {
        const commentId = +e.currentTarget
            .parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');

        let data;

        const downExist = this.issetVote(commentId, 'down');

        data = downExist
            ? {vote: 'veto', id: commentId}
            : {vote: 'down', id: commentId};

        this.props.onChangeVote(data);

        const voteArrayFiltered = this.state.voteArray.filter(item => +item.id !== commentId);

        this.setState(
            {
                voteArray: downExist ? [...voteArrayFiltered] : [...voteArrayFiltered, data]
            }
        )

    }


    issetVote(commentId, vote) {
        const voteArrayFiltered
            = this.state.voteArray.filter(item => (+item.id === commentId && item.vote === vote));

        return !!voteArrayFiltered.length;
    }


    // countComments() {
    //
    // }

}