import {isEscapeKey} from './util.js';
import {bodyElement} from './photo-rendering.js';
import {onPreviewCreateEffect} from './effect-slider.js';
import {onPictureDecrement, onPictureIncrement} from './foto-transform.js';

const uploadFieldElement = document.querySelector('.img-upload');
const imageEditBoxElement = uploadFieldElement.querySelector('.img-upload__overlay');
const uploadFileElement = uploadFieldElement.querySelector('#upload-file');
const editBoxCancelElement = uploadFieldElement.querySelector('.img-upload__cancel');
const hashtagsFieldElement = uploadFieldElement.querySelector('.text__hashtags');
const discriptionFieldElement = uploadFieldElement.querySelector('.text__description');
const zoomValueElement = uploadFieldElement.querySelector('.scale__control--value');
const imagePreviewElement = uploadFieldElement.querySelector('.img-upload__preview img');
const sliderContainerElement = uploadFieldElement.querySelector('.img-upload__effect-level');
const effectsListElement = uploadFieldElement.querySelector('.effects__list');
const zoomDownElement = uploadFieldElement.querySelector('.scale__control--smaller');
const zoomUpElement = uploadFieldElement.querySelector('.scale__control--bigger');
const defaultEffectElement = uploadFieldElement.querySelector('#effect-none');

const onEditBoxKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    imageEditBoxElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    uploadFileElement.value = '';
    hashtagsFieldElement.value = '';
    discriptionFieldElement.value = '';
  }
};

const onTextAreaKeydownLock = (evt) => {
  evt.stopPropagation();
};

const onImageEditBoxClose = () => {
  imageEditBoxElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadFileElement.value = '';
  hashtagsFieldElement.value = '';
  discriptionFieldElement.value = '';
  document.removeEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.removeEventListener('click', onImageEditBoxClose);
  hashtagsFieldElement.removeEventListener('keydown', onTextAreaKeydownLock);
  discriptionFieldElement.removeEventListener('keydown', onTextAreaKeydownLock);
  effectsListElement.removeEventListener('change', onPreviewCreateEffect);
  zoomDownElement.removeEventListener('click', onPictureDecrement);
  zoomUpElement.removeEventListener('click', onPictureIncrement);
};

const onImageEditBoxOpen = () => {
  imageEditBoxElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  zoomValueElement.value = '100%';
  sliderContainerElement.style.display = 'none';
  imagePreviewElement.style.filter = 'none';
  imagePreviewElement.style.transform = 'scale(1)';
  imagePreviewElement.dataset.scaleValue = '1';
  defaultEffectElement.checked = true;
  document.addEventListener('keydown', onEditBoxKeydown);
  editBoxCancelElement.addEventListener('click', onImageEditBoxClose);
  hashtagsFieldElement.addEventListener('keydown', onTextAreaKeydownLock);
  discriptionFieldElement.addEventListener('keydown', onTextAreaKeydownLock);
  effectsListElement.addEventListener('change', onPreviewCreateEffect);
  zoomDownElement.addEventListener('click', onPictureDecrement);
  zoomUpElement.addEventListener('click', onPictureIncrement);
};

uploadFileElement.addEventListener('change', () => {
  onImageEditBoxOpen();
});


export {
  hashtagsFieldElement, discriptionFieldElement, zoomValueElement,
  imagePreviewElement,sliderContainerElement, onImageEditBoxClose,
};
