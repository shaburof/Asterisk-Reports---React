import React from 'react';

interface messageInterface {
    mainText: string,
    subText?: string
}

const Message: React.FC<messageInterface> = ({ mainText, subText }) => {

    return <section className="error_message_area message">
        <p className="message__text--title" style={{ textAlign: 'center' }}>{mainText}</p>
        <p className="message__text--paragraph" style={{ textAlign: 'center' }}>{subText}</p>
        {/* <p className="message__text--paragraph">обновите страницу и попробуйте еще раз</p> */}
    </section>
}

export default Message;