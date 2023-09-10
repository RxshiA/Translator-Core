import React, { Component } from 'react';
import '../../Styles/style.css';
import Sidebar from '../../views/Sidebar';
import Navbar from '../../views/NavBar';

export default class Home extends Component {

  componentDidMount() {
    const languages = {
      'en-GB': 'English',
      'si-LK': 'Sinhala',
    };

  const fromText = document.querySelector('.from-text');
  const toText = document.querySelector('.to-text');
  const exchageIcon = document.querySelector('.exchange');
  const selectTag = document.querySelectorAll('select');
  const icons = document.querySelectorAll('.row i');
  const translateBtn = document.querySelector('button');

  selectTag.forEach((tag, id) => {
    for (let language_code in languages) {
      let selected =
        id === 0
          ? language_code === 'en-GB'
            ? 'selected'
              : ''
            : language_code === 'hi-IN'
            ? 'selected'
            : '';
        let option = `<option ${selected} value="${language_code}">${languages[language_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
      }

    });

  exchageIcon.addEventListener('click', () => {
    let tempText = fromText.value,
      tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

 

  fromText.addEventListener('keyup', () => {
    if (!fromText.value) {
      toText.value = '';
    }
  });

  translateBtn.addEventListener('click', () => {
    let text = fromText.value.trim(),
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute('placeholder', 'Translating...');
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach((data) => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute('placeholder', 'Translation');
        });
    });

 

  icons.forEach((icon) => {
    let utterance = new SpeechSynthesisUtterance();
      icon.addEventListener('click', ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains('fa-copy')) {
          if (target.id === 'from') {
            navigator.clipboard.writeText(fromText.value);
          } else {
            navigator.clipboard.writeText(toText.value);
          }
        } else {
          if (target.id === 'from') {
            utterance.text = fromText.value;
            utterance.lang = selectTag[0].value; // Set the language
          } else {
            utterance.text = toText.value;
            utterance.lang = selectTag[1].value; // Set the language
          }
        }
        speechSynthesis.speak(utterance);
      });
    });
  }

  render() {
    return (
      <>
        <div className="relative md:ml-64 bg-blueGray-100">
          <Navbar />
          <div className="relative bg-pink-600 md:pt-32 pb-5 pt-12"></div>
        </div>
        <div className="Home">
          <div className="container ml-20">
            <div className="wrapper">
              <div className="text-input">
                <textarea
                  spellCheck="false"
                  className="from-text"
                  placeholder="Enter text"
                ></textarea>
                <textarea
                  spellCheck="false"
                  readOnly
                  disabled
                  className="to-text"
                  placeholder="Translation"
                ></textarea>
              </div>
              <ul className="controls">
                <li className="row from">
                  <div className="icons">
                    <i id="from" className="fas fa-volume-up"></i>
                    <i className="fas fa-copy"></i>
                  </div>
                  <select></select>
                </li>
                <li className="exchange">
                  <i className="fas fa-exchange-alt"></i>
                </li>
                <li className="row to">
                  <select></select>
                  <div className="icons">
                    <i id="to" className="fas fa-volume-up"></i>
                    <i className="fas fa-copy"></i>
                  </div>
                </li>
              </ul>
            </div>
            <button>Translate Text</button>
          </div>
          <Sidebar />
        </div>
      </>
    );
  }
}