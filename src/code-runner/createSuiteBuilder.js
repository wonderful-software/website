export function createSuiteBuilder () {
  const rootSuite = createTestSuite(null, '(root)')
  let _currentSuite = rootSuite

  function createTestSuite (parent, title) {
    const children = [ ]
    const tests = [ ]
    function createChildSuite (title) {
      const childSuite = createTestSuite(suite, title)
      children.push(childSuite)
      return childSuite
    }
    function addTest (title, assertion) {
      tests.push({ title, assertion })
    }
    const suite = {
      title,
      parent,
      children,
      createChildSuite,
      addTest,
      tests,
      isEmpty: () => !children.length && !tests.length
    }
    return suite
  }

  function describe (title, suiteSpec) {
    const newSuite = _currentSuite.createChildSuite(title)
    _currentSuite = newSuite
    try {
      suiteSpec()
    } finally {
      _currentSuite = newSuite.parent
    }
  }

  function it (title, assertion) {
    _currentSuite.addTest(title, assertion)
  }

  return { describe, it, getSuite: () => rootSuite }
}

export default createSuiteBuilder
