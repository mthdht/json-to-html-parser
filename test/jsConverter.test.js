const JsonConverter = require('../');

describe('convertToElement', () => {
  test('should return an html element', () => {
    // GIVEN
    const enterValue = {
      tag: 'p',
      attributes: {
        class: 'classe1 classe2',
        title: 'Some title'
      },
      content: 'My p content'
    };

    // WHEN
    const returnValue = JsonConverter.convertToElement(enterValue);

    // THEN
    expect(returnValue).toBe('<p class="classe1 classe2" title="Some title">My p content</p>');
  });
});

describe('attributesParser', () => {
  test('should return attributes to html element', () => {
    // GIVEN
    const enterValue = {
      class: 'classe1 classe2',
      title: 'Some title'
    };

    // WHEN
    const returnValue = JsonConverter.attributesParser(enterValue);

    // THEN
    expect(returnValue).toBe(' class="classe1 classe2" title="Some title"');
  });
});
