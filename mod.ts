export default {
  "components": {
    "schemas": {
      "App": {
        "properties": {
          "manifest": {
            "$ref": "#/components/schemas/Manifest"
          },
          "name": {
            "type": "string"
          },
          "url": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "url"
        ],
        "type": "object"
      },
      "ConsoleLog": {
        "additionalProperties": false,
        "properties": {
          "app": {
            "description": "The name of the application",
            "type": "string"
          },
          "level": {
            "description": "The log level",
            "enum": [
              "INFO",
              "WARN",
              "ERROR",
              "DEBUG"
            ],
            "type": "string"
          },
          "msg": {
            "description": "The log message",
            "type": "string"
          },
          "text": {
            "description": "The base64-encoded log message",
            "type": "string"
          },
          "time": {
            "description": "The timestamp of the log entry",
            "format": "date-time",
            "type": "string"
          },
          "type": {
            "enum": [
              "stdout",
              "stderr"
            ],
            "type": "string"
          }
        },
        "required": [
          "time",
          "level",
          "app",
          "msg",
          "type",
          "text"
        ],
        "type": "object"
      },
      "CronLog": {
        "additionalProperties": false,
        "properties": {
          "app": {
            "description": "The name of the application running the cron job",
            "type": "string"
          },
          "args": {
            "description": "The arguments passed to the cron job",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "duration": {
            "description": "The duration of the cron job execution in milliseconds",
            "minimum": 0,
            "type": "integer"
          },
          "exit_code": {
            "description": "The exit code of the cron job",
            "type": "integer"
          },
          "id": {
            "description": "A unique identifier for the cron job, typically in the format 'app:job'",
            "type": "string"
          },
          "job": {
            "description": "The name of the cron job",
            "type": "string"
          },
          "level": {
            "description": "The log level",
            "enum": [
              "INFO",
              "WARN",
              "ERROR",
              "DEBUG"
            ],
            "type": "string"
          },
          "msg": {
            "description": "The log message, typically including the exit code",
            "type": "string"
          },
          "schedule": {
            "description": "The schedule of the cron job",
            "type": "string"
          },
          "time": {
            "description": "The timestamp of the log entry",
            "format": "date-time",
            "type": "string"
          },
          "type": {
            "description": "The type of log entry, always 'cron' for this schema",
            "enum": [
              "cron"
            ]
          }
        },
        "required": [
          "time",
          "level",
          "msg",
          "type",
          "id",
          "app",
          "job",
          "schedule",
          "args",
          "exit_code",
          "stdout",
          "stderr",
          "duration"
        ],
        "type": "object"
      },
      "HttpLog": {
        "additionalProperties": false,
        "properties": {
          "level": {
            "description": "The log level",
            "enum": [
              "INFO",
              "WARNING",
              "ERROR",
              "DEBUG"
            ],
            "type": "string"
          },
          "msg": {
            "description": "A brief description of the logged event",
            "type": "string"
          },
          "request": {
            "additionalProperties": false,
            "properties": {
              "headers": {
                "additionalProperties": {
                  "type": "string"
                },
                "description": "The headers sent with the request",
                "type": "object"
              },
              "host": {
                "description": "The host component of the request URL",
                "type": "string"
              },
              "method": {
                "description": "The HTTP method used for the request",
                "enum": [
                  "GET",
                  "POST",
                  "PUT",
                  "DELETE",
                  "PATCH",
                  "HEAD",
                  "OPTIONS"
                ],
                "type": "string"
              },
              "path": {
                "description": "The path component of the request URL",
                "type": "string"
              },
              "url": {
                "description": "The full URL of the request",
                "format": "uri",
                "type": "string"
              }
            },
            "required": [
              "url",
              "host",
              "method",
              "path",
              "headers"
            ],
            "type": "object"
          },
          "response": {
            "additionalProperties": false,
            "properties": {
              "bytes": {
                "description": "The number of bytes in the response body",
                "minimum": 0,
                "type": "integer"
              },
              "elapsed": {
                "description": "The time taken to process the request and generate the response, in seconds",
                "minimum": 0,
                "type": "number"
              },
              "status": {
                "description": "The HTTP status code of the response",
                "maximum": 599,
                "minimum": 100,
                "type": "integer"
              }
            },
            "required": [
              "status",
              "bytes",
              "elapsed"
            ],
            "type": "object"
          },
          "time": {
            "description": "The time when the log entry was created",
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "time",
          "level",
          "msg",
          "request",
          "response"
        ],
        "type": "object"
      },
      "Manifest": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "allOf": [
          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "definitions": {
              "external_application_resource": {
                "properties": {
                  "fingerprints": {
                    "description": "An array of fingerprint objects used for verifying the application.",
                    "items": {
                      "properties": {
                        "type": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "id": {
                    "description": "Information additional to the URL or instead of the URL, depending on the platform.",
                    "type": "string"
                  },
                  "min_version": {
                    "description": "Information about the minimum version of an application related to this web app.",
                    "type": "string"
                  },
                  "platform": {
                    "description": "The platform it is associated to.",
                    "enum": [
                      "chrome_web_store",
                      "play",
                      "itunes",
                      "windows"
                    ]
                  },
                  "url": {
                    "description": "The URL where the application can be found.",
                    "format": "uri",
                    "type": "string"
                  }
                },
                "required": [
                  "platform"
                ],
                "type": "object"
              },
              "manifest_image_resource": {
                "properties": {
                  "purpose": {
                    "default": "any",
                    "enum": [
                      "monochrome",
                      "maskable",
                      "any",
                      "monochrome maskable",
                      "monochrome any",
                      "maskable monochrome",
                      "maskable any",
                      "any monochrome",
                      "any maskable",
                      "monochrome maskable any",
                      "monochrome any maskable",
                      "maskable monochrome any",
                      "maskable any monochrome",
                      "any monochrome maskable",
                      "any maskable monochrome"
                    ],
                    "type": "string"
                  },
                  "sizes": {
                    "description": "The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.",
                    "oneOf": [
                      {
                        "pattern": "^[0-9 x]+$",
                        "type": "string"
                      },
                      {
                        "enum": [
                          "any"
                        ]
                      }
                    ]
                  },
                  "src": {
                    "description": "The src member of an image is a URL from which a user agent can fetch the icon's data.",
                    "type": "string"
                  },
                  "type": {
                    "description": "The type member of an image is a hint as to the media type of the image.",
                    "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
                    "type": "string"
                  }
                },
                "required": [
                  "src"
                ],
                "type": "object"
              },
              "shortcut_item": {
                "description": "A shortcut item represents a link to a key task or page within a web app. A user agent can use these values to assemble a context menu to be displayed by the operating system when a user engages with the web app's icon.",
                "properties": {
                  "description": {
                    "description": "The description member of a shortcut item is a string that allows the developer to describe the purpose of the shortcut.",
                    "type": "string"
                  },
                  "icons": {
                    "description": "The icons member of a shortcut item serves as iconic representations of the shortcut in various contexts.",
                    "items": {
                      "properties": {
                        "purpose": {
                          "default": "any",
                          "enum": [
                            "monochrome",
                            "maskable",
                            "any",
                            "monochrome maskable",
                            "monochrome any",
                            "maskable monochrome",
                            "maskable any",
                            "any monochrome",
                            "any maskable",
                            "monochrome maskable any",
                            "monochrome any maskable",
                            "maskable monochrome any",
                            "maskable any monochrome",
                            "any monochrome maskable",
                            "any maskable monochrome"
                          ],
                          "type": "string"
                        },
                        "sizes": {
                          "description": "The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.",
                          "oneOf": [
                            {
                              "pattern": "^[0-9 x]+$",
                              "type": "string"
                            },
                            {
                              "enum": [
                                "any"
                              ]
                            }
                          ]
                        },
                        "src": {
                          "description": "The src member of an image is a URL from which a user agent can fetch the icon's data.",
                          "type": "string"
                        },
                        "type": {
                          "description": "The type member of an image is a hint as to the media type of the image.",
                          "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
                          "type": "string"
                        }
                      },
                      "required": [
                        "src"
                      ],
                      "type": "object"
                    },
                    "type": "array"
                  },
                  "name": {
                    "description": "The name member of a shortcut item is a string that represents the name of the shortcut as it is usually displayed to the user in a context menu.",
                    "type": "string"
                  },
                  "short_name": {
                    "description": "The short_name member of a shortcut item is a string that represents a short version of the name of the shortcut. It is intended to be used where there is insufficient space to display the full name of the shortcut.",
                    "type": "string"
                  },
                  "url": {
                    "description": "The url member of a shortcut item is a URL within scope of a processed manifest that opens when the associated shortcut is activated.",
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "url"
                ],
                "type": "object"
              }
            },
            "id": "https://json.schemastore.org/web-manifest.json",
            "properties": {
              "background_color": {
                "description": "The background_color member describes the expected background color of the web application.",
                "type": "string"
              },
              "dir": {
                "default": "auto",
                "description": "The base direction of the manifest.",
                "enum": [
                  "ltr",
                  "rtl",
                  "auto"
                ]
              },
              "display": {
                "default": "browser",
                "description": "The item represents the developer's preferred display mode for the web application.",
                "enum": [
                  "fullscreen",
                  "standalone",
                  "minimal-ui",
                  "browser"
                ]
              },
              "icons": {
                "description": "The icons member is an array of icon objects that can serve as iconic representations of the web application in various contexts.",
                "items": {
                  "properties": {
                    "purpose": {
                      "default": "any",
                      "enum": [
                        "monochrome",
                        "maskable",
                        "any",
                        "monochrome maskable",
                        "monochrome any",
                        "maskable monochrome",
                        "maskable any",
                        "any monochrome",
                        "any maskable",
                        "monochrome maskable any",
                        "monochrome any maskable",
                        "maskable monochrome any",
                        "maskable any monochrome",
                        "any monochrome maskable",
                        "any maskable monochrome"
                      ],
                      "type": "string"
                    },
                    "sizes": {
                      "description": "The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.",
                      "oneOf": [
                        {
                          "pattern": "^[0-9 x]+$",
                          "type": "string"
                        },
                        {
                          "enum": [
                            "any"
                          ]
                        }
                      ]
                    },
                    "src": {
                      "description": "The src member of an image is a URL from which a user agent can fetch the icon's data.",
                      "type": "string"
                    },
                    "type": {
                      "description": "The type member of an image is a hint as to the media type of the image.",
                      "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
                      "type": "string"
                    }
                  },
                  "required": [
                    "src"
                  ],
                  "type": "object"
                },
                "type": "array"
              },
              "id": {
                "description": "A string that represents the id of the web application.",
                "type": "string"
              },
              "lang": {
                "description": "The primary language for the values of the manifest.",
                "type": "string"
              },
              "name": {
                "description": "The name of the web application.",
                "type": "string"
              },
              "orientation": {
                "description": "The orientation member is a string that serves as the default orientation for all  top-level browsing contexts of the web application.",
                "enum": [
                  "any",
                  "natural",
                  "landscape",
                  "portrait",
                  "portrait-primary",
                  "portrait-secondary",
                  "landscape-primary",
                  "landscape-secondary"
                ]
              },
              "prefer_related_applications": {
                "description": "Boolean value that is used as a hint for the user agent to say that related applications should be preferred over the web application.",
                "type": "boolean"
              },
              "related_applications": {
                "description": "Array of application accessible to the underlying application platform that has a relationship with the web application.",
                "items": {
                  "properties": {
                    "fingerprints": {
                      "description": "An array of fingerprint objects used for verifying the application.",
                      "items": {
                        "properties": {
                          "type": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          }
                        },
                        "type": "object"
                      },
                      "type": "array"
                    },
                    "id": {
                      "description": "Information additional to the URL or instead of the URL, depending on the platform.",
                      "type": "string"
                    },
                    "min_version": {
                      "description": "Information about the minimum version of an application related to this web app.",
                      "type": "string"
                    },
                    "platform": {
                      "description": "The platform it is associated to.",
                      "enum": [
                        "chrome_web_store",
                        "play",
                        "itunes",
                        "windows"
                      ]
                    },
                    "url": {
                      "description": "The URL where the application can be found.",
                      "format": "uri",
                      "type": "string"
                    }
                  },
                  "required": [
                    "platform"
                  ],
                  "type": "object"
                },
                "type": "array"
              },
              "scope": {
                "description": "A string that represents the navigation scope of this web application's application context.",
                "type": "string"
              },
              "short_name": {
                "description": "A string that represents a short version of the name of the web application.",
                "type": "string"
              },
              "shortcuts": {
                "description": "Array of shortcut items that provide access to key tasks within a web application.",
                "items": {
                  "description": "A shortcut item represents a link to a key task or page within a web app. A user agent can use these values to assemble a context menu to be displayed by the operating system when a user engages with the web app's icon.",
                  "properties": {
                    "description": {
                      "description": "The description member of a shortcut item is a string that allows the developer to describe the purpose of the shortcut.",
                      "type": "string"
                    },
                    "icons": {
                      "description": "The icons member of a shortcut item serves as iconic representations of the shortcut in various contexts.",
                      "items": {
                        "properties": {
                          "purpose": {
                            "default": "any",
                            "enum": [
                              "monochrome",
                              "maskable",
                              "any",
                              "monochrome maskable",
                              "monochrome any",
                              "maskable monochrome",
                              "maskable any",
                              "any monochrome",
                              "any maskable",
                              "monochrome maskable any",
                              "monochrome any maskable",
                              "maskable monochrome any",
                              "maskable any monochrome",
                              "any monochrome maskable",
                              "any maskable monochrome"
                            ],
                            "type": "string"
                          },
                          "sizes": {
                            "description": "The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.",
                            "oneOf": [
                              {
                                "pattern": "^[0-9 x]+$",
                                "type": "string"
                              },
                              {
                                "enum": [
                                  "any"
                                ]
                              }
                            ]
                          },
                          "src": {
                            "description": "The src member of an image is a URL from which a user agent can fetch the icon's data.",
                            "type": "string"
                          },
                          "type": {
                            "description": "The type member of an image is a hint as to the media type of the image.",
                            "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
                            "type": "string"
                          }
                        },
                        "required": [
                          "src"
                        ],
                        "type": "object"
                      },
                      "type": "array"
                    },
                    "name": {
                      "description": "The name member of a shortcut item is a string that represents the name of the shortcut as it is usually displayed to the user in a context menu.",
                      "type": "string"
                    },
                    "short_name": {
                      "description": "The short_name member of a shortcut item is a string that represents a short version of the name of the shortcut. It is intended to be used where there is insufficient space to display the full name of the shortcut.",
                      "type": "string"
                    },
                    "url": {
                      "description": "The url member of a shortcut item is a URL within scope of a processed manifest that opens when the associated shortcut is activated.",
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "url"
                  ],
                  "type": "object"
                },
                "type": "array"
              },
              "start_url": {
                "description": "Represents the URL that the developer would prefer the user agent load when the user launches the web application.",
                "type": "string"
              },
              "theme_color": {
                "description": "The theme_color member serves as the default theme color for an application context.",
                "type": "string"
              }
            },
            "title": "JSON schema for Web Application manifest files",
            "type": "object"
          },
          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "https://json.schemastore.org/web-manifest-app-info.json",
            "properties": {
              "categories": {
                "description": "Describes the expected application categories to which the web application belongs.",
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              "description": {
                "description": "Description of the purpose of the web application",
                "type": "string"
              },
              "iarc_rating_id": {
                "description": "Represents an ID value of the IARC rating of the web application. It is intended to be used to determine which ages the web application is appropriate for.",
                "type": "string"
              },
              "screenshots": {
                "description": "The screenshots member is an array of image objects represent the web application in common usage scenarios.",
                "items": {
                  "properties": {
                    "purpose": {
                      "default": "any",
                      "enum": [
                        "monochrome",
                        "maskable",
                        "any",
                        "monochrome maskable",
                        "monochrome any",
                        "maskable monochrome",
                        "maskable any",
                        "any monochrome",
                        "any maskable",
                        "monochrome maskable any",
                        "monochrome any maskable",
                        "maskable monochrome any",
                        "maskable any monochrome",
                        "any monochrome maskable",
                        "any maskable monochrome"
                      ],
                      "type": "string"
                    },
                    "sizes": {
                      "description": "The sizes member is a string consisting of an unordered set of unique space-separated tokens which are ASCII case-insensitive that represents the dimensions of an image for visual media.",
                      "oneOf": [
                        {
                          "pattern": "^[0-9 x]+$",
                          "type": "string"
                        },
                        {
                          "enum": [
                            "any"
                          ]
                        }
                      ]
                    },
                    "src": {
                      "description": "The src member of an image is a URL from which a user agent can fetch the icon's data.",
                      "type": "string"
                    },
                    "type": {
                      "description": "The type member of an image is a hint as to the media type of the image.",
                      "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
                      "type": "string"
                    }
                  },
                  "required": [
                    "src"
                  ],
                  "type": "object"
                },
                "type": "array"
              }
            },
            "title": "JSON schema for Web Application manifest files with app information extensions",
            "type": "object"
          },
          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "definitions": {
              "share_target": {
                "description": "Describes how the application receives share data.",
                "properties": {
                  "action": {
                    "description": "The URL for the web share target.",
                    "type": "string"
                  },
                  "enctype": {
                    "default": "application/x-www-form-urlencoded",
                    "description": "This member specifies the encoding in the share request.",
                    "enum": [
                      "application/x-www-form-urlencoded",
                      "multipart/form-data",
                      "APPLICATION/X-WWW-FORM-URLENCODED",
                      "MULTIPART/FORM-DATA"
                    ],
                    "type": "string"
                  },
                  "method": {
                    "default": "GET",
                    "description": "The HTTP request method for the web share target.",
                    "enum": [
                      "GET",
                      "POST",
                      "get",
                      "post"
                    ],
                    "type": "string"
                  },
                  "params": {
                    "description": "Specifies what data gets shared in the request.",
                    "properties": {
                      "files": {
                        "description": "Description of how the application receives files from share requests.",
                        "oneOf": [
                          {
                            "description": "Description of how the application receives files from share requests.",
                            "properties": {
                              "accept": {
                                "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                                "oneOf": [
                                  {
                                    "pattern": "^((\\..*)|(.*/.*))$",
                                    "type": "string"
                                  },
                                  {
                                    "items": {
                                      "pattern": "^((\\..*)|(.*/.*))$",
                                      "type": "string"
                                    },
                                    "type": "array"
                                  }
                                ]
                              },
                              "name": {
                                "description": "The name of the form field used to share the files.",
                                "type": "string"
                              }
                            },
                            "required": [
                              "name",
                              "accept"
                            ],
                            "type": "object"
                          },
                          {
                            "items": {
                              "description": "Description of how the application receives files from share requests.",
                              "properties": {
                                "accept": {
                                  "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                                  "oneOf": [
                                    {
                                      "pattern": "^((\\..*)|(.*/.*))$",
                                      "type": "string"
                                    },
                                    {
                                      "items": {
                                        "pattern": "^((\\..*)|(.*/.*))$",
                                        "type": "string"
                                      },
                                      "type": "array"
                                    }
                                  ]
                                },
                                "name": {
                                  "description": "The name of the form field used to share the files.",
                                  "type": "string"
                                }
                              },
                              "required": [
                                "name",
                                "accept"
                              ],
                              "type": "object"
                            },
                            "type": "array"
                          }
                        ]
                      },
                      "text": {
                        "description": "The name of the query parameter used for the message body, made of arbitrary text.",
                        "type": "string"
                      },
                      "title": {
                        "description": "The name of the query parameter used for the title of the document being shared.",
                        "type": "string"
                      },
                      "url": {
                        "description": "The name of the query parameter used for the URL string referring to a resource being shared.",
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                },
                "required": [
                  "action",
                  "params"
                ],
                "type": "object"
              },
              "share_target_files": {
                "description": "Description of how the application receives files from share requests.",
                "properties": {
                  "accept": {
                    "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                    "oneOf": [
                      {
                        "pattern": "^((\\..*)|(.*/.*))$",
                        "type": "string"
                      },
                      {
                        "items": {
                          "pattern": "^((\\..*)|(.*/.*))$",
                          "type": "string"
                        },
                        "type": "array"
                      }
                    ]
                  },
                  "name": {
                    "description": "The name of the form field used to share the files.",
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "accept"
                ],
                "type": "object"
              },
              "share_target_params": {
                "description": "Specifies what data gets shared in the request.",
                "properties": {
                  "files": {
                    "description": "Description of how the application receives files from share requests.",
                    "oneOf": [
                      {
                        "description": "Description of how the application receives files from share requests.",
                        "properties": {
                          "accept": {
                            "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                            "oneOf": [
                              {
                                "pattern": "^((\\..*)|(.*/.*))$",
                                "type": "string"
                              },
                              {
                                "items": {
                                  "pattern": "^((\\..*)|(.*/.*))$",
                                  "type": "string"
                                },
                                "type": "array"
                              }
                            ]
                          },
                          "name": {
                            "description": "The name of the form field used to share the files.",
                            "type": "string"
                          }
                        },
                        "required": [
                          "name",
                          "accept"
                        ],
                        "type": "object"
                      },
                      {
                        "items": {
                          "description": "Description of how the application receives files from share requests.",
                          "properties": {
                            "accept": {
                              "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                              "oneOf": [
                                {
                                  "pattern": "^((\\..*)|(.*/.*))$",
                                  "type": "string"
                                },
                                {
                                  "items": {
                                    "pattern": "^((\\..*)|(.*/.*))$",
                                    "type": "string"
                                  },
                                  "type": "array"
                                }
                              ]
                            },
                            "name": {
                              "description": "The name of the form field used to share the files.",
                              "type": "string"
                            }
                          },
                          "required": [
                            "name",
                            "accept"
                          ],
                          "type": "object"
                        },
                        "type": "array"
                      }
                    ]
                  },
                  "text": {
                    "description": "The name of the query parameter used for the message body, made of arbitrary text.",
                    "type": "string"
                  },
                  "title": {
                    "description": "The name of the query parameter used for the title of the document being shared.",
                    "type": "string"
                  },
                  "url": {
                    "description": "The name of the query parameter used for the URL string referring to a resource being shared.",
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "id": "https://json.schemastore.org/web-manifest-share-target.json",
            "properties": {
              "share_target": {
                "description": "Declares the application to be a web share target, and describes how it receives share data.",
                "properties": {
                  "action": {
                    "description": "The URL for the web share target.",
                    "type": "string"
                  },
                  "enctype": {
                    "default": "application/x-www-form-urlencoded",
                    "description": "This member specifies the encoding in the share request.",
                    "enum": [
                      "application/x-www-form-urlencoded",
                      "multipart/form-data",
                      "APPLICATION/X-WWW-FORM-URLENCODED",
                      "MULTIPART/FORM-DATA"
                    ],
                    "type": "string"
                  },
                  "method": {
                    "default": "GET",
                    "description": "The HTTP request method for the web share target.",
                    "enum": [
                      "GET",
                      "POST",
                      "get",
                      "post"
                    ],
                    "type": "string"
                  },
                  "params": {
                    "description": "Specifies what data gets shared in the request.",
                    "properties": {
                      "files": {
                        "description": "Description of how the application receives files from share requests.",
                        "oneOf": [
                          {
                            "description": "Description of how the application receives files from share requests.",
                            "properties": {
                              "accept": {
                                "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                                "oneOf": [
                                  {
                                    "pattern": "^((\\..*)|(.*/.*))$",
                                    "type": "string"
                                  },
                                  {
                                    "items": {
                                      "pattern": "^((\\..*)|(.*/.*))$",
                                      "type": "string"
                                    },
                                    "type": "array"
                                  }
                                ]
                              },
                              "name": {
                                "description": "The name of the form field used to share the files.",
                                "type": "string"
                              }
                            },
                            "required": [
                              "name",
                              "accept"
                            ],
                            "type": "object"
                          },
                          {
                            "items": {
                              "description": "Description of how the application receives files from share requests.",
                              "properties": {
                                "accept": {
                                  "description": "Sequence of accepted MIME types or file extensions can be shared to the application.",
                                  "oneOf": [
                                    {
                                      "pattern": "^((\\..*)|(.*/.*))$",
                                      "type": "string"
                                    },
                                    {
                                      "items": {
                                        "pattern": "^((\\..*)|(.*/.*))$",
                                        "type": "string"
                                      },
                                      "type": "array"
                                    }
                                  ]
                                },
                                "name": {
                                  "description": "The name of the form field used to share the files.",
                                  "type": "string"
                                }
                              },
                              "required": [
                                "name",
                                "accept"
                              ],
                              "type": "object"
                            },
                            "type": "array"
                          }
                        ]
                      },
                      "text": {
                        "description": "The name of the query parameter used for the message body, made of arbitrary text.",
                        "type": "string"
                      },
                      "title": {
                        "description": "The name of the query parameter used for the title of the document being shared.",
                        "type": "string"
                      },
                      "url": {
                        "description": "The name of the query parameter used for the URL string referring to a resource being shared.",
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                },
                "required": [
                  "action",
                  "params"
                ],
                "type": "object"
              }
            },
            "title": "JSON schema for Web Application manifest files with Web Share Target and Web Share Target Level 2 extensions",
            "type": "object"
          }
        ],
        "id": "https://json.schemastore.org/web-manifest-combined.json",
        "title": "JSON schema for Web Application manifest files"
      }
    }
  },
  "info": {
    "title": "Smallweb API",
    "version": "0"
  },
  "openapi": "3.0.3",
  "paths": {
    "/v0/apps": {
      "get": {
        "operationId": "GetV0Apps",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/App"
                  },
                  "type": "array"
                }
              }
            },
            "description": "List of apps"
          }
        }
      }
    },
    "/v0/apps/{app}": {
      "get": {
        "operationId": "GetV0AppsApp",
        "parameters": [
          {
            "in": "path",
            "name": "app",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/App"
                }
              }
            },
            "description": "Get app"
          }
        }
      }
    },
    "/v0/logs/console": {
      "get": {
        "operationId": "GetV0LogsConsole",
        "parameters": [
          {
            "description": "Filter logs by app",
            "in": "query",
            "name": "app",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "text/event-stream": {
                "schema": {
                  "$ref": "#/components/schemas/ConsoleLog"
                }
              }
            },
            "description": "Stream logs"
          }
        }
      }
    },
    "/v0/logs/cron": {
      "get": {
        "operationId": "GetV0LogsCron",
        "parameters": [
          {
            "description": "Filter logs by app",
            "in": "query",
            "name": "app",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "text/event-stream": {
                "schema": {
                  "$ref": "#/components/schemas/CronLog"
                }
              }
            },
            "description": "Stream logs"
          }
        }
      }
    },
    "/v0/logs/http": {
      "get": {
        "operationId": "GetV0LogsHttp",
        "parameters": [
          {
            "description": "Filter logs by host",
            "in": "query",
            "name": "host",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "text/event-stream": {
                "schema": {
                  "$ref": "#/components/schemas/HttpLog"
                }
              }
            },
            "description": "Stream logs"
          }
        }
      }
    },
    "/v0/run/{app}": {
      "post": {
        "operationId": "PostV0RunApp",
        "parameters": [
          {
            "in": "path",
            "name": "app",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "args": {
                    "items": {
                      "type": "string"
                    },
                    "type": "array"
                  }
                },
                "required": [
                  "args"
                ],
                "type": "object"
              }
            }
          }
        },
        "responses": {
          "200": {
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            },
            "description": "Run app cli",
            "headers": {
              "Content-Type": {
                "schema": {
                  "type": "string"
                }
              },
              "X-Exit-Code": {
                "schema": {
                  "type": "integer"
                }
              }
            }
          }
        }
      }
    }
  }
} as const;