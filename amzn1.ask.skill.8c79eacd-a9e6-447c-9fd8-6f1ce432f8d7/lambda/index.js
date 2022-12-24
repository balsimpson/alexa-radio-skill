/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const https = require('https');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PlayMediaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayMediaIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    async handle(handlerInput) {

        const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'SEARCH_TERM');
        
        let res = await getRemoteData("?search="+slotValue)
        let track = JSON.parse(res);
        
        // let outputSpeech = await getRemoteData("?now_playing="+track);
        let outputSpeech = "Now playing " + track.name;

        let playBehavior = 'REPLACE_ALL';
        let streamUrl = track.url;
        let offsetInMilliseconds = track.offset || 0;
        let token = `${track.channel}::${track.name}`
        
        return handlerInput.responseBuilder
            .speak(outputSpeech)
            .addAudioPlayerPlayDirective(
                playBehavior,
                streamUrl,
                token,
                offsetInMilliseconds
                )
            .getResponse();
  }
};


// const NextIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent';
//     },
//     async handle(handlerInput) {
        
//         let res = await getRemoteData("?token="+handlerInput.requestEnvelope.request.token)
//         let track = JSON.parse(res);
        
//         let outputSpeech = await getRemoteData("?next_playing="+track);

//         let playBehavior = 'REPLACE_ALL';
//         let streamUrl = track.url;
//         let offsetInMilliseconds = track.offset || 0;
//         let token = `${track.channel}::${track.station}`
        
//         return handlerInput.responseBuilder
//             .speak(outputSpeech)
//             .addAudioPlayerPlayDirective(
//                 playBehavior,
//                 streamUrl,
//                 token,
//                 offsetInMilliseconds
//                 )
//             .getResponse();
//     }
// };

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    async handle(handlerInput) {
        let outputSpeech = await getRemoteData("?help="+"help");

        return handlerInput.responseBuilder
            .speak(outputSpeech)
            .reprompt(outputSpeech)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};
/**
 * Intent handler to start playing an audio file.
 * By default, it will play a specific audio stream.
 * */
const PauseAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    async handle(handlerInput) {
        let token = handlerInput.requestEnvelope.context.AudioPlayer.token || "not found";
        let offset = handlerInput.requestEnvelope.context.AudioPlayer.offsetInMilliseconds || 0;
        let res = await getRemoteData("?token="+token+'&offset='+offset);
        const speakOutput = 'Ciao! The token is ' + token + ' and offset is ' + offset;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};
/* *
 * AudioPlayer events can be triggered when users interact with your audio playback, such as stopping and 
 * starting the audio, as well as when playback is about to finish playing or playback fails.
 * This handler will save the appropriate details for each event and log the details of the exception,
 * which can help troubleshoot issues with audio playback.
 * */
// const AudioPlayerEventHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
//   },
//   async handle(handlerInput) {
//     // const playbackInfo = await getPlaybackInfo(handlerInput);
//     // let res = await getRemoteData("?queue="+"handlerInput.requestEnvelope.request.token")
//     const audioPlayerEventName = handlerInput.requestEnvelope.request.type.split('.')[1];
//     // console.log(`AudioPlayer event encountered: ${handlerInput.requestEnvelope.request.type}`);
//     // // let returnResponseFlag = false;
//     switch (audioPlayerEventName) {
//       case 'PlaybackStarted':
//         // playbackInfo.token = handlerInput.requestEnvelope.request.token;
//         // playbackInfo.inPlaybackSession = true;
//         // playbackInfo.hasPreviousPlaybackSession = true;
//         // returnResponseFlag = true;
//         // console.log('PlaybackStarted', handlerInput.requestEnvelope.request);
//         return {"version": "1.0",
//             "response": {
//                 "shouldEndSession": true
//             }
//         }
//         // break;
//       case 'PlaybackFinished':
//         // playbackInfo.inPlaybackSession = false;
//         // playbackInfo.hasPreviousPlaybackSession = false;
//         // playbackInfo.nextStreamEnqueued = false;
//         // returnResponseFlag = true;
//         console.log('PlaybackFinished', handlerInput.requestEnvelope.request);
//         break;
//       case 'PlaybackStopped':
//         // playbackInfo.token = handlerInput.requestEnvelope.request.token;
//         // playbackInfo.inPlaybackSession = true;
//         // playbackInfo.offsetInMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds;
//         // let stopped = await getRemoteData("?stop="+handlerInput.requestEnvelope.request.token)
//         console.log('PlaybackStopped', handlerInput.requestEnvelope.request);
//         break;
//       case 'PlaybackNearlyFinished':
//         //  let res = await getRemoteData("?queue="+"handlerInput.requestEnvelope.request.token")
//         console.log('PlaybackNearlyFinished', handlerInput.requestEnvelope.request);
//         // return handlerInput.responseBuilder
//         //     .addAudioPlayerPlayDirective(
//         //         "ENQUEUE",
//         //         "https://boetiesoundfiles.s3.amazonaws.com/australia_dundee.mp3",
//         //         "token",
//         //         0
//         //         )
//         //     .getResponse();
//         break;
//       case 'PlaybackFailed':
//         // playbackInfo.inPlaybackSession = false;
//         console.log('Playback Failed : %j', handlerInput.requestEnvelope.request.error);
//         break;
//       default:
//         break;
//     }
//     // setPlaybackInfo(handlerInput, playbackInfo);
//     // return handlerInput.responseBuilder.getResponse();
//   },
// };
// const PlaybackStoppedIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'PlaybackController.PauseCommandIssued'
//       || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
//   },
//   handle(handlerInput) {
//     handlerInput.responseBuilder
//       .addAudioPlayerClearQueueDirective('CLEAR_ALL')
//       .addAudioPlayerStopDirective();

//     return handlerInput.responseBuilder
//       .getResponse();
//   },
// };

// const PlaybackStartedIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted'
//     || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished'
//     || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackNearlyFinished';
//   },
//   handle(handlerInput) {
//     // handlerInput.responseBuilder
//     //   .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');
//     console.log('audio-player');
//     return handlerInput.responseBuilder
//       .getResponse();
//     // return {}
//   },
// };

const AudioPlayerEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
  },
  async handle(handlerInput) {
    // const playbackInfo = await getPlaybackInfo(handlerInput);
    
    const audioPlayerEventName = handlerInput.requestEnvelope.request.type.split('.')[1];
    console.log(`AudioPlayer event encountered: ${handlerInput.requestEnvelope.request.type}`);
    let returnResponseFlag = false;
    switch (audioPlayerEventName) {
      case 'PlaybackStarted':
        // playbackInfo.token = handlerInput.requestEnvelope.request.token;
        // playbackInfo.inPlaybackSession = true;
        // playbackInfo.hasPreviousPlaybackSession = true;
        returnResponseFlag = true;
        break;
      case 'PlaybackFinished':
        // playbackInfo.inPlaybackSession = false;
        // playbackInfo.hasPreviousPlaybackSession = false;
        // playbackInfo.nextStreamEnqueued = false;
        returnResponseFlag = true;
        break;
      case 'PlaybackStopped':
        // playbackInfo.token = handlerInput.requestEnvelope.request.token;
        // playbackInfo.inPlaybackSession = true;
        // playbackInfo.offsetInMilliseconds = handlerInput.requestEnvelope.request.offsetInMilliseconds;
        break;
      case 'PlaybackNearlyFinished':
        break;
      case 'PlaybackFailed':
        // playbackInfo.inPlaybackSession = false;
        console.log('Playback Failed : %j', handlerInput.requestEnvelope.request.error);
        break;
      default:
        break;
    }
    // setPlaybackInfo(handlerInput, playbackInfo);
    return handlerInput.responseBuilder.getResponse();
  },
};

/* *
 * PlaybackController events can be triggered when users interact with the audio controls on a device screen.
 * starting the audio, as well as when playback is about to finish playing or playback fails.
 * This handler will save the appropriate details for each event and log the details of the exception,
 * which can help troubleshoot issues with audio playback.
 * */
// const PlaybackControllerHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type.startsWith('PlaybackController.');
//   },
//   async handle(handlerInput) {
//     // const playbackInfo = await getPlaybackInfo(handlerInput);
//     const playBehavior = 'REPLACE_ALL';
//     const podcastUrl = 'https://audio1.maxi80.com';
//     const playbackControllerEventName = handlerInput.requestEnvelope.request.type.split('.')[1];
//     let response;
//     switch (playbackControllerEventName) {
//       case 'PlayCommandIssued':
//         // response = handlerInput.responseBuilder
//         //     .addAudioPlayerPlayDirective(
//         //         playBehavior,
//         //         podcastUrl,
//         //         playbackInfo.token,
//         //         playbackInfo.offsetInMilliseconds
//         //         )
//         //     .getResponse();
//         break;
//       case 'PauseCommandIssued':
//         response = handlerInput.responseBuilder
//             .addAudioPlayerStopDirective()
//             .getResponse();
//         break;
//       default:
//         break;
//     }
//     // setPlaybackInfo(handlerInput, playbackInfo);

//     console.log(`PlayCommandIssued event encountered: ${handlerInput.requestEnvelope.request.type}`);
//     return response;
//   },
// };

/* *
 * SystemExceptions can be triggered if there is a problem with the audio that is trying to be played.
 * This handler will log the details of the exception and can help troubleshoot issues with audio playback.
 * */
const SystemExceptionHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
  },
  handle(handlerInput) {
    console.log(`System exception encountered: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
  },
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
// const FallbackIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
//     },
//     handle(handlerInput) {
//         const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(speakOutput)
//             .getResponse();
//     }
// };
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
// const IntentReflectorHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
//     },
//     handle(handlerInput) {
//         const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
//         const speakOutput = `You just triggered ${intentName}`;

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//     }
// };
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
// const ErrorHandler = {
//     canHandle() {
//         return true;
//     },
//     handle(handlerInput, error) {
//         const speakOutput = 'Error!' + `${JSON.stringify(error)}`;
//         console.log(`~~~~ Error handled: request`, handlerInput.requestEnvelope.request);
//         console.log(`~~~~ Error handled: AudioPlayer`, handlerInput.requestEnvelope.context.AudioPlayer);
//         return handlerInput.responseBuilder
//             // .speak(speakOutput)
//             // .reprompt(speakOutput)
//             .getResponse();
//     }
// };

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error: ${error}`);
    console.log(handlerInput.requestEnvelope.request.type);
    // return handlerInput.responseBuilder
    //   .getResponse();
  },
};

/**
 * Intent handler for built-in intents that aren't supported in this sample skill.
 * As this is a sample skill for a single stream, these intents are irrelevant to this skill.
 * Regardless, the skill needs to handle this gracefully, which is why this handler exists.
 * */
// const UnsupportedAudioIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && (
//                 Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.LoopOffIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.LoopOnIntent'
//                     // || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PreviousIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ShuffleOffIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ShuffleOnIntent'
//                     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StartOverIntent'
//                 );
//     },
//     async handle(handlerInput) {
//         const speakOutput = 'Sorry, I can\'t support that yet.';

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .getResponse();
//     }
// };

/* HELPER FUNCTIONS */

// async function getPlaybackInfo(handlerInput) {
//   const attributes = await handlerInput.attributesManager.getPersistentAttributes();
//   return attributes.playbackInfo;
// }

// async function setPlaybackInfo(handlerInput, playbackInfoObject) {
//   await handlerInput.attributesManager.setPersistentAttributes({
//       playbackInfo: playbackInfoObject
//       });
// }

// async function getNextTrack(token) {
//     let item;
//     if (token) {
//         let channel = token.split('::')[0]
//         let station = token.split('::')[1]
        
//         // get the channel
        
//         // if shuffle is on, play random station
        
//         // else, play next station

//     } else {
        
//         // pick random channel
    
//     }

//     return item;
// }

const getRemoteData = (val) => new Promise((resolve, reject) => {
  let url = 'https://alexaradio.vercel.app/api/radio' + val;
  const client = url.startsWith('https') ? require('https') : require('http');
  const request = client.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Failed with status code: ${response.statusCode}`));
    }
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });
  request.on('error', (err) => reject(err));
});

async function makePOSTRequest(val) {
    let options = {
          hostname: 'alexaradio.vercel.app',
          path: '/api/radio?search=' + encodeURIComponent(val),
          method: 'GET',
        };
    const req = https.request((res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          return JSON.parse(data);
        });
      });
    
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
    
    //   req.write(JSON.stringify(options.body));
      req.end();
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayMediaIntentHandler,
        // NextIntentHandler,
        AudioPlayerEventHandler,
        // PlaybackStoppedIntentHandler,
        // PlaybackStartedIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        // PlaybackControllerHandler,
        // UnsupportedAudioIntentHandler,
        // FallbackIntentHandler,
        PauseAudioIntentHandler,
        SystemExceptionHandler,
        SessionEndedRequestHandler,
        )
    .addErrorHandlers(
        ErrorHandler
        )
    // .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();