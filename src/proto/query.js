module.exports = require("protobufjs").newBuilder({}).import({
  "package": "sajari.engine.query",
  "messages": [{
    "name": "Request",
    "fields": [{
      "rule": "repeated",
      "type": "Body",
      "name": "body",
      "id": 1,
    }, {
      "rule": "repeated",
      "type": "Term",
      "name": "terms",
      "id": 2,
    }, {
      "rule": "optional",
      "type": "Filter",
      "name": "filter",
      "id": 3,
    }, {
      "rule": "repeated",
      "type": "MetaBoost",
      "name": "meta_boosts",
      "id": 4,
    }, {
      "rule": "repeated",
      "type": "IndexBoost",
      "name": "index_boosts",
      "id": 5,
    }, {
      "rule": "optional",
      "type": "int32",
      "name": "page",
      "id": 6,
    }, {
      "rule": "optional",
      "type": "int32",
      "name": "max_results",
      "id": 7,
    }, {
      "rule": "repeated",
      "type": "string",
      "name": "fields",
      "id": 8,
    }, {
      "rule": "repeated",
      "type": "Sort",
      "name": "sort",
      "id": 9,
    }, {
      "rule": "map",
      "type": "Aggregate",
      "keytype": "string",
      "name": "aggregates",
      "id": 10,
    }, {
      "rule": "repeated",
      "type": "Transform",
      "name": "transforms",
      "id": 11,
    }]
  }, {
    "name": "Transform",
    "fields": [{
      "rule": "optional",
      "type": "string",
      "name": "identifier",
      "id": 1,
    }]
  }, {
    "name": "Term",
    "fields": [{
      "rule": "optional",
      "type": "string",
      "name": "value",
      "id": 1,
    }, {
      "rule": "optional",
      "type": "string",
      "name": "field",
      "id": 2,
    }, {
      "rule": "optional",
      "type": "uint32",
      "name": "pos",
      "id": 3,
    }, {
      "rule": "optional",
      "type": "uint32",
      "name": "neg",
      "id": 4,
    }, {
      "rule": "optional",
      "type": "double",
      "name": "potency",
      "id": 5,
    }, {
      "rule": "optional",
      "type": "uint32",
      "name": "word_offset",
      "id": 6,
    }, {
      "rule": "optional",
      "type": "uint32",
      "name": "para_offset",
      "id": 7,
    }]
  }, {
    "name": "EvaluateRequest",
    "fields": [{
      "rule": "optional",
      "type": "Request",
      "name": "request",
      "id": 1,
    }, {
      "rule": "map",
      "type": "bytes",
      "keytype": "string",
      "name": "document",
      "id": 2,
    }]
  }, {
    "name": "CompareRequest",
    "fields": [{
      "rule": "optional",
      "type": "Request",
      "name": "request",
      "id": 1,
    }, {
      "rule": "map",
      "type": "bytes",
      "keytype": "string",
      "name": "ref_document",
      "id": 2,
    }, {
      "rule": "map",
      "type": "bytes",
      "keytype": "string",
      "name": "document",
      "id": 3,
    }]
  }, {
    "name": "Body",
    "fields": [{
      "rule": "optional",
      "type": "string",
      "name": "text",
      "id": 1,
    }, {
      "rule": "optional",
      "type": "double",
      "name": "weight",
      "id": 2,
    }]
  }, {
    "name": "Aggregate",
    "fields": [{
      "rule": "optional",
      "type": "Metric",
      "name": "metric",
      "id": 1,
      "oneof": "aggregater",
    }, {
      "rule": "optional",
      "type": "Count",
      "name": "count",
      "id": 2,
      "oneof": "aggregater",
    }, {
      "rule": "optional",
      "type": "Bucket",
      "name": "bucket",
      "id": 3,
      "oneof": "aggregater",
    }],
    "oneofs": {
      "aggregater": [
        1,
        2,
        3,
      ]
    },
    "messages": [{
      "name": "Metric",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1,
      }, {
        "rule": "optional",
        "type": "Type",
        "name": "type",
        "id": 2,
      }],
      "enums": [{
        "name": "Type",
        "values": [{
          "name": "AVG",
          "id": 0,
        }, {
          "name": "MIN",
          "id": 1,
        }, {
          "name": "MAX",
          "id": 2,
        }, {
          "name": "SUM",
          "id": 3,
        }]
      }]
    }, {
      "name": "Count",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1,
      }]
    }, {
      "name": "Bucket",
      "fields": [{
        "rule": "repeated",
        "type": "Bucket",
        "name": "buckets",
        "id": 1,
      }],
      "messages": [{
        "name": "Bucket",
        "fields": [{
          "rule": "optional",
          "type": "string",
          "name": "name",
          "id": 1,
        }, {
          "rule": "optional",
          "type": "Filter",
          "name": "filter",
          "id": 2,
        }]
      }]
    }]
  }, {
    "name": "Sort",
    "fields": [{
      "rule": "optional",
      "type": "string",
      "name": "field",
      "id": 1,
    }, {
      "rule": "optional",
      "type": "Order",
      "name": "order",
      "id": 2,
    }],
    "enums": [{
      "name": "Order",
      "values": [{
        "name": "ASC",
        "id": 0,
      }, {
        "name": "DESC",
        "id": 1,
      }]
    }]
  }, {
    "name": "Filter",
    "fields": [{
      "rule": "optional",
      "type": "Combinator",
      "name": "combinator",
      "id": 1,
      "oneof": "filterer",
    }, {
      "rule": "optional",
      "type": "Field",
      "name": "field",
      "id": 2,
      "oneof": "filterer",
    }],
    "oneofs": {
      "filterer": [
        1,
        2,
      ]
    },
    "messages": [{
      "name": "Field",
      "fields": [{
        "rule": "optional",
        "type": "Operator",
        "name": "operator",
        "id": 1,
      }, {
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 2,
      }, {
        "rule": "optional",
        "type": "bytes",
        "name": "value",
        "id": 3,
      }],
      "enums": [{
        "name": "Operator",
        "values": [{
          "name": "EQUAL_TO",
          "id": 0,
        }, {
          "name": "DOES_NOT_EQUAL",
          "id": 1,
        }, {
          "name": "GREATER_THAN",
          "id": 2,
        }, {
          "name": "GREATER_THAN_OR_EQUAL_TO",
          "id": 3,
        }, {
          "name": "LESS_THAN",
          "id": 4,
        }, {
          "name": "LESS_THAN_OR_EQUAL_TO",
          "id": 5,
        }, {
          "name": "CONTAINS",
          "id": 6,
        }, {
          "name": "DOES_NOT_CONTAIN",
          "id": 7,
        }, {
          "name": "ENDS_WITH",
          "id": 8,
        }, {
          "name": "STARTS_WITH",
          "id": 9,
        }]
      }]
    }, {
      "name": "Combinator",
      "fields": [{
        "rule": "optional",
        "type": "Operator",
        "name": "operator",
        "id": 1,
      }, {
        "rule": "repeated",
        "type": "Filter",
        "name": "filters",
        "id": 2,
      }],
      "enums": [{
        "name": "Operator",
        "values": [{
          "name": "ALL",
          "id": 0,
        }, {
          "name": "ANY",
          "id": 1,
        }, {
          "name": "ONE",
          "id": 2,
        }, {
          "name": "NONE",
          "id": 3,
        }]
      }]
    }]
  }, {
    "name": "MetaBoost",
    "fields": [{
      "rule": "optional",
      "type": "Add",
      "name": "add",
      "id": 1,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Filter",
      "name": "filter",
      "id": 2,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Geo",
      "name": "geo",
      "id": 3,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Interval",
      "name": "interval",
      "id": 4,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Distance",
      "name": "distance",
      "id": 5,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Element",
      "name": "element",
      "id": 6,
      "oneof": "meta_booster",
    }, {
      "rule": "optional",
      "type": "Text",
      "name": "text",
      "id": 7,
      "oneof": "meta_booster",
    }],
    "oneofs": {
      "meta_booster": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]
    },
    "messages": [{
      "name": "Filter",
      "fields": [{
        "rule": "optional",
        "type": "query.Filter",
        "name": "filter",
        "id": 1,
      }, {
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 2,
      }]
    }, {
      "name": "Add",
      "fields": [{
        "rule": "optional",
        "type": "MetaBoost",
        "name": "meta_boost",
        "id": 1,
      }, {
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 2,
      }]
    }, {
      "name": "Geo",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field_lat",
        "id": 1,
      }, {
        "rule": "optional",
        "type": "string",
        "name": "field_lng",
        "id": 2,
      }, {
        "rule": "optional",
        "type": "double",
        "name": "lat",
        "id": 3,
      }, {
        "rule": "optional",
        "type": "double",
        "name": "lng",
        "id": 4
      }, {
        "rule": "optional",
        "type": "double",
        "name": "radius",
        "id": 5
      }, {
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 6
      }, {
        "rule": "optional",
        "type": "Region",
        "name": "region",
        "id": 7
      }],
      "enums": [{
        "name": "Region",
        "values": [{
          "name": "INSIDE",
          "id": 0
        }, {
          "name": "OUTSIDE",
          "id": 1
        }]
      }]
    }, {
      "name": "Interval",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1
      }, {
        "rule": "repeated",
        "type": "Point",
        "name": "points",
        "id": 2
      }],
      "messages": [{
        "name": "Point",
        "fields": [{
          "rule": "optional",
          "type": "double",
          "name": "point",
          "id": 1
        }, {
          "rule": "optional",
          "type": "double",
          "name": "value",
          "id": 2
        }]
      }]
    }, {
      "name": "Distance",
      "fields": [{
        "rule": "optional",
        "type": "double",
        "name": "min",
        "id": 1
      }, {
        "rule": "optional",
        "type": "double",
        "name": "max",
        "id": 2
      }, {
        "rule": "optional",
        "type": "double",
        "name": "ref",
        "id": 3
      }, {
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 4
      }, {
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 5
      }]
    }, {
      "name": "Element",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1
      }, {
        "rule": "repeated",
        "type": "string",
        "name": "elts",
        "id": 3
      }]
    }, {
      "name": "Text",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1
      }, {
        "rule": "optional",
        "type": "string",
        "name": "text",
        "id": 3
      }]
    }]
  }, {
    "name": "IndexBoost",
    "fields": [{
      "rule": "optional",
      "type": "Field",
      "name": "field",
      "id": 1,
      "oneof": "index_booster"
    }, {
      "rule": "optional",
      "type": "Score",
      "name": "score",
      "id": 2,
      "oneof": "index_booster"
    }],
    "oneofs": {
      "index_booster": [
        1,
        2
      ]
    },
    "messages": [{
      "name": "Field",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1
      }, {
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 2
      }]
    }, {
      "name": "Score",
      "fields": [{
        "rule": "optional",
        "type": "double",
        "name": "threshold",
        "id": 1
      }]
    }]
  }, {
    "name": "AggregateResponse",
    "fields": [{
      "rule": "optional",
      "type": "Metric",
      "name": "metric",
      "id": 1,
      "oneof": "response"
    }, {
      "rule": "optional",
      "type": "Count",
      "name": "count",
      "id": 2,
      "oneof": "response"
    }, {
      "rule": "optional",
      "type": "Buckets",
      "name": "buckets",
      "id": 3,
      "oneof": "response"
    }],
    "oneofs": {
      "response": [
        1,
        2,
        3
      ]
    },
    "messages": [{
      "name": "Metric",
      "fields": [{
        "rule": "optional",
        "type": "double",
        "name": "value",
        "id": 1
      }]
    }, {
      "name": "Count",
      "fields": [{
        "rule": "map",
        "type": "int32",
        "keytype": "string",
        "name": "counts",
        "id": 1
      }]
    }, {
      "name": "Buckets",
      "fields": [{
        "rule": "map",
        "type": "Bucket",
        "keytype": "string",
        "name": "buckets",
        "id": 1
      }],
      "messages": [{
        "name": "Bucket",
        "fields": [{
          "rule": "optional",
          "type": "string",
          "name": "name",
          "id": 1
        }, {
          "rule": "optional",
          "type": "int32",
          "name": "count",
          "id": 2
        }]
      }]
    }]
  }, {
    "name": "Response",
    "fields": [{
      "rule": "optional",
      "type": "int64",
      "name": "reads",
      "id": 1
    }, {
      "rule": "optional",
      "type": "int64",
      "name": "totalResults",
      "id": 2
    }, {
      "rule": "optional",
      "type": "string",
      "name": "time",
      "id": 3
    }, {
      "rule": "map",
      "type": "AggregateResponse",
      "keytype": "string",
      "name": "aggregates",
      "id": 4
    }, {
      "rule": "repeated",
      "type": "Result",
      "name": "results",
      "id": 5
    }]
  }, {
    "name": "Result",
    "fields": [{
      "rule": "map",
      "type": "bytes",
      "keytype": "string",
      "name": "meta",
      "id": 1
    }, {
      "rule": "optional",
      "type": "double",
      "name": "score",
      "id": 2
    }, {
      "rule": "optional",
      "type": "double",
      "name": "raw_score",
      "id": 3
    }]
  }, {
    "name": "AnalyseRequest",
    "fields": [{
      "rule": "optional",
      "type": "Request",
      "name": "request",
      "id": 1
    }, {
      "rule": "optional",
      "type": "Key",
      "name": "key",
      "id": 2
    }],
    "messages": [{
      "name": "Key",
      "fields": [{
        "rule": "optional",
        "type": "string",
        "name": "field",
        "id": 1
      }, {
        "rule": "optional",
        "type": "bytes",
        "name": "value",
        "id": 2
      }]
    }]
  }, {
    "name": "AnalyseResponse",
    "fields": [{
      "rule": "repeated",
      "type": "string",
      "name": "terms",
      "id": 1
    }]
  }],
  "services": [{
    "name": "Query",
    "options": {},
    "rpc": {
      "Search": {
        "request": "Request",
        "response": "Response",
        "options": {}
      },
      "Evaluate": {
        "request": "EvaluateRequest",
        "response": "Response",
        "options": {}
      },
      "Compare": {
        "request": "CompareRequest",
        "response": "Response",
        "options": {}
      },
      "Analyse": {
        "request": "AnalyseRequest",
        "response": "AnalyseResponse",
        "options": {}
      }
    }
  }]
}).build();
