import React, { Component } from 'react';
import styles from './_Form.scss';
import classNames from 'classnames';
import Loader from '../Loader/Loader';

class Form extends Component {

  _submit(e){
    e.preventDefault();

    let that = this;
    switch(this.props.mode){
      case 'auth':
        this.props.submitAuth({
          username: that.refs.username.value,
          password: that.refs.password.value,
        });
      break;
      case 'topic':
        this.props.submitTopic({
          title: that.refs.title.value,
          content: that.refs.content.value,
        });
      break;
    }
  }

  _auth(){

    return (
      <div>
        <input type="text" ref="username" placeholder="Username" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        <input type="password" ref="password" placeholder="Password" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        {(this.props.error) && <div>Error</div>}
        <div className={styles['col-10']}>
          <button type="submit" className={styles['form__btn']} disabled={this.props.loading}>{this.props.btntxt} {(this.props.loading) && <Loader color={'white'} size={14} />}</button>
        </div>
      </div>
    )
  }

  _topic(){

    return (
      <div>
        <input type="text" ref="title" placeholder="Title" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        <textarea ref="content" placeholder="Content" className={classNames(styles['form__field'], styles['form__field--area'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        {(this.props.error) && <div>Error</div>}
        <div className={styles['col-10']}>
          <button type="submit" className={styles['form__btn']} disabled={this.props.loading}>{this.props.btntxt} {(this.props.loading) && <Loader color={'white'} size={14} />}</button>
        </div>
      </div>
    )
  }

  render() {

    return (
        <form className={styles.form} onSubmit={(e) => this._submit(e)}>
            {(this.props.mode === 'auth') && this._auth()}
            {(this.props.mode === 'topic') && this._topic()}
        </form>
    );
  }
}

Form.defaultProps = {
  submitAuth: (obj) => {
    console.log('submit', obj);
  },
  submitTopic: (obj) => {
    console.log('submit', obj);
  },
  error: false,
  loading: false,
  mode: 'topic',
  btntxt: 'Submit'
};

Form.propTypes = {
  submitAuth: React.PropTypes.func,
  submitTopic: React.PropTypes.func,
  error: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  mode: React.PropTypes.string,
  btntxt: React.PropTypes.string
};

export default Form;
