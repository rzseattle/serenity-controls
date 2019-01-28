import React from 'react';

const Menu = () => <div id="menu">
    <ul>
        <li className="current_page_item"><a href="/" accessKey="1" title="">Homepage</a></li>
        <li><a  onClick={() =>{
            alert("aaa");
        }} target="_blank" accessKey="2" title="Storybook">Storybook1221</a></li>
        <li><a href="/wiki" accessKey="3" title="">Wiki</a></li>
        <li><a href="/api" accessKey="4" title="">API Doc</a></li>
    </ul>
</div>

export default Menu;