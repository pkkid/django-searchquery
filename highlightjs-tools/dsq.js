// dsq.js (django-searchquery)
// Django SearchQuery language file for Highlight.js
// See also: https://github.com/pkkid/django-searchquery/blob/main/django_searchquery/parser.py
// eslint-disable-next-line
export default function(hljs) {
  const source = function(re) { return typeof re === 'string' ? re : re.source }
  const concat = function(...args) { return args.map((x) => source(x)).join('') }
  const lookahead = function(re) { return concat('(?=', re, ')') }
  const lookbehind = function(re) { return concat('(?<=', re, ')') }
  const token = function(className, begin, end) { return { className, begin, end } }

  const OPERATORS = />=|>|!=|!~|<=|<|=|:|~/
  const STRING = /[^'"(),\s\n]+/

  return {
    name: 'DSQ',
    case_insensitive: true,
    contains: [
      token('keyword', /\b(and|or|in|not|order|by)\b/),               // keyword
      token('operator', concat(/-/, lookahead(STRING))),              // -exclude
      token('string', '"', '"'),                                      // "string"
      token('string', "'", "'"),                                      // 'string'
      token('literal', /\b(true|false|null|none)\b/),                 // literal
      token('built_in', concat(/[a-z]+\s*/, lookahead(OPERATORS))),   // column before operator
      token('string', concat(lookbehind(OPERATORS), /\s*/, STRING)),  // string after operator
      token('operator', OPERATORS),                                   // operator
      token('string', STRING),                                        // string without quotes
    ]
  }
}
