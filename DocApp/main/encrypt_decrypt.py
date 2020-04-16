# !pip install pycryptodome
# !pip install pycryptodomex
from Crypto.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_OAEP
from Cryptodome.Hash import SHA512
import firebase_admin
from firebase_admin import firestore

import base64
firebase_admin.initialize_app()

db = firestore.client()
def getdata(phnumber):
    privatekey = db.collection(u'Profile').document(u'' + phnumber).get().to_dict()['PrivateKey']
    rsakey = RSA.importKey(base64.b64decode(privatekey))
    # rsakey =  PKCS1_OAEP.new(rsakey, hashAlgo=SHA256, mgfunc=lambda x,y: pss.MGF1(x,y, SHA256))
    rsakey = PKCS1_OAEP.new(rsakey, SHA512)

    def decrypt_location(loc, rsakey):
        #         global rsakey
        b64_decoded_message = base64.b64decode(loc)
        decrypted = rsakey.decrypt(b64_decoded_message)
        return decrypted

    #         #temorary
    #         #3decimal places taken
    #         lat=round(locx[0],3)
    #         long=round(locx[1],3)
    #         return(str(lat)+','+str(long))
    #         #temp ends
    #         #decrypt and send
    #         #return(list(map(float,loc.split(','))))
    def rev_cipher(num):
        # add code here
        return num

    users_ref = db.collection(u'Profile').document(u'' + phnumber).collection('TimeStamps')
    docs = users_ref.stream()
    blth = {}
    loc = {}
    for doc in docs:
        bdic = doc.to_dict()
        time = bdic['TimeStamps']
        if (bdic['Activity'] == "STILL"):
            loci = bdic['Location']
            #             print(loci)
            loci = decrypt_location(loci, rsakey)
            if loci in loc:
                loc[loci]["time"] += 2
                loc[loci]["last"] = time
            else:
                loc[loci] = {"time": 2, "last": time}

        if 'BluetoothName' in bdic:
            for bl in bdic['BluetoothName']:
                bl1 = rev_cipher(bl)
                if bl1 in blth:
                    blth[bl1]["time"] += 2
                    blth[bl1]["last"] = time
                else:
                    blth[bl1] = {"time": 2, "last": time}
    blth2 = {}
    for i in blth:
        number = db.collection(u'Identify').document(u'' + i).get().to_dict()['Number']
        blth2[number] = {"time": blth[i]["time"], "last": blth[i]["last"]}

    def update_prob(blth):
        for i in blth:
            prob = db.collection(u'Profile').document(u'' + i).get().to_dict()['Probability']
            if blth[i]['time'] > 15:
                prob += 0.7
            elif blth[i]['time'] > 5:
                prob += 0.4
            else:
                prob += 0.2
            prob = min(prob, 1)
            pth = db.collection(u'Profile').document(u'' + i).update({u'Probability': prob})
            data = {
                u'time spent': blth[i]['time'],
                u'last': blth[i]['last']
            }

            db.collection(u'Profile').document(u'' + i).collection(u'contact').document().set(data, merge=True)

    update_prob(blth2)

    ## to conver to list
    loc2 = []
    for i in loc:
        loc2 += [{'geo': i.decode("utf-8"), 'last': loc[i]['last'], 'time': loc[i]['time']}]

    return ({"devices": blth2, "location": loc2})



