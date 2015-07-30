describe('Github Profile finder', function() {

  var searchBox = element(by.model('searchCtrl.searchTerm'))
  var searchButton = element(by.className('btn'))

  beforeEach(function() {
    browser.get('http://localhost:3000');
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Github user search');
  })

  it('finds profiles', function() {

    searchBox.sendKeys('spike01')
    searchButton.click()

    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    // expect(element(by.binding('user.login')).getText()).toEqual('spike01');
    expect(profiles.get(0).getText()).toEqual('spike01');
  });

  it('finds the last Spike', function() {
    searchBox.sendKeys('spike');
    searchButton.click();

    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(profiles.last().getText()).toNotEqual('spike01');
  })


  it('contains the user name with a link to its Github profile', function () {
    searchBox.sendKeys('spike01');
    searchButton.click();

    expect(element(by.binding('user.login'))
      .getAttribute('href')
      .then(function(result) {
        expect(result).toEqual('https://github.com/spike01');

      })
     )
   })

});




