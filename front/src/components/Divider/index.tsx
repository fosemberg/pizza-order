import React from 'react';
import './index.scss'

const Divider: React.FC<{ text: string }> = (props) => (
  <div className="Divider">{props.text}</div>
);

export default Divider;
