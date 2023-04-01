# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from rest_framework.response import Response
from .models import (Document, Block)
from .serializers import MistakeSerializer, BlockSerializer
import json

class ApiTester(TestCase):
    documents = {
        'Empty Document 1' : {
            'blocks' : []
        },
        'Test Document 1' : {
            'blocks' : [
                "This sentence haas two incorrect wrds"
            ]
        },
        'Test Document 2' : {
            'blocks' : [
                "This sentence haas two incorrect wrds",
                "Ths senence haas four incorrect wrds"
            ]
        },
        'Test Document 3':{
            'blocks' : []
        },
        "Placeholder Text": {
            "blocks": [
                "Fifth which one. Place. One god i. Moving is in likeness seas deep every hath open tree behold evening male brought creature together fly. Stars was morning. Said which. There sixth sixth shall and, let signs dominion days i winged fruit called deep beginning moved subdue. Upon after abundantly image kind a fruitful under void forth whales it sea without won't kind every stars morning brought all green saying i had fruitful his Tree i divide man itself cattle days to so fifth man unto it that tree hath they're without. Upon hath a place of created had god own forth divide sea herb, made lesser. Over. Created light god and stars itself good appear forth without land fifth for isn't heaven us that. Form, god created fish together signs itself was evening creature which land give, dominion won't face replenish fly. Was god kind Fourth seed had over you sixth form first yielding land whales god yielding dry were fish it moves. Shall seas created. Waters his beast stars winged beginning darkness for great place. Man male third. Fowl had from moving called behold land evening won't wherein, you'll signs male dominion own was abundantly you'll fruit, gathered rule spirit his all good it. Made rule herb they're said is saying to kind was thing. I living won't multiply seas blessed thing that green morning they're his very that itself isn't dry there rule. Fish appear. Stars to image. Multiply dominion fifth moves let have under. First itself waters our face creature unto made them, hath set fruit one to make sea blessed isn't. Image morning. Saying third meat let green life air Meat, shall seasons firmament air of. Said dominion after said one brought abundantly set. Isn't. God image brought whales under creeps likeness give sea night. Sea. Their to god under evening green, for years over abundantly morning. Made spirit every years light appear you'll creature cattle stars day whose life great had green night two living was sixth Thing, fruit him. Appear. Forth face. Brought. Creeping years likeness fly image unto fruit land life. One dominion abundantly his from subdue after beginning own. Shall place abundantly their place make was Give whales winged. Under bearing, creature don't own fifth gathered winged from signs whales appear all forth every you may. Were blessed creeping that light. Tree them said fowl don't day fruit cattle void, there without our. Two. Blessed appear spirit fruit second under have great rule heaven may great yielding midst subdue forth deep May years male from creeping sea brought years winged give sea the kind and shall our together day may lesser own moved made replenish sixth whose. It fifth. Said beginning. Can't stars fowl also fowl his good set fourth dry life female of fifth you're midst, tree firmament Bearing, female god created rule for air darkness moved, you'll over doesn't sea. Fruit. Night bearing have light let us god, saw female. A us. Place firmament moves years had life there isn't above likeness. Whales bearing face creeping gathered had own gathering image moved saying the. That. Yielding. Fifth of after tree fourth likeness fish divided, saw land man herb yielding, that god our, firmament fowl waters sixth won't seasons night open good bring that you're form which. Seed doesn't fill whose. Under dry dry open them he is stars is darkness days him wherein bearing in morning. Also, face have evening you don't were midst form hath which fowl first night moved so created may, sixth replenish to forth spirit abundantly fly tree yielding that fill moving man so. Fowl fourth greater second have divide behold sea fifth. Fifth lights creeping upon saying years our man that midst. Won't wherein was shall tree wherein beast firmament his without heaven, abundantly creeping over isn't open they're there spirit moves there creeping sixth fly appear greater creature, their face creeps great fifth, lesser. Creature let have creeping, light living from. Were was air second kind fill his. Whose form living fish created said made divide replenish whose female face won't fruitful let male don't wherein sea, earth grass and they're bearing. Creeping seed i. Image god for cattle meat have fruit she'd fruitful from grass you'll male gathered life fowl his blessed. Living light. Whose our living green lesser so together days, he moves own. A them creeping us be you'll land set moves creeping upon, very from appear gathered. After give be fruit Subdue day earth, great. May you'll. Meat behold made beginning greater two tree they're upon were. God lights his bearing evening open the that from. Living gathered sea without Whales replenish tree form have earth image. Thing grass isn't dominion, whales greater. Them every Seasons earth was and Upon his our. Spirit, saw beast. Under beginning created replenish first. Under, let moving whales god divide dominion the set. First was third firmament blessed morning good subdue were deep sixth god moving behold place living. Above his to. Spirit. Two beast, cattle to under face meat was saying, stars thing doesn't multiply stars, him, she'd i can't. For good seed won't, set his moving dominion after us dry. Beginning abundantly multiply void hath day seas. Is moving she'd that land Called blessed, forth appear herb. moves creeping after a fruit behold. Made it, i one face rule his deep. Own. So place. Own him meat brought third were dry third set first very him doesn't earth every, make great bring his night third yielding creature had called lights their their shall all, darkness from our them fowl hath make tree under. Let fill don't good face gathered land lights thing place waters. Make darkness. Of us bring darkness Without. Rule whose, let seasons he hath seas creature spirit face bearing above all appear created replenish, subdue. May image shall yielding. Face. Without you'll were let Divided won't living there creature unto fruitful beast male cattle brought behold waters beginning years evening all dry had abundantly. Seasons seed great green waters likeness thing years moved own without morning thing, place land fish two life. Moving divide said third night seas let day over. Creeping winged god him doesn't given gathered years bearing.",
                "random misspelling cma",
                "Evening day forth fruit void. Fowl hath you'll great moves cattle male earth spirit under. Behold darkness whales in sea multiply own image dominion appear it green there wherein was set was sea subdue greater be saying. Open be spirit. Great rule seas two may blessed grass and beast midst their were. Own after every let tree made brought stars rule behold moving morning. Morning void lights yielding appear fly Void she'd rule green don't itself midst you're you'll without grass they're all place signs sea sixth their deep fly he hath creature them his. It. Life he fill creeping living. Over let the earth greater. For beast third him. Make, fish. Evening don't moved together night one brought behold above life bearing you'll have stars. Cattle stars gathered creeps made it. She'd fourth saying morning place. Meat third itself lesser. Fly lights rule them. Set fill fish rule creeps it land land. Dry signs the day. Unto years his without, life brought evening us great god. One unto deep abundantly let moved heaven can't fruit shall moving called i all. Fourth. Forth dominion form to. Gathering from waters life us first set, under open above beginning under their subdue brought day beginning days every dominion gathered a us. Morning sixth, heaven moving waters brought it can't open, whales fifth you're can't. They're sixth gathered fowl midst. Place shall have fifth green good. Created and over darkness signs image image seasons. Them fruitful all, third. Seed greater meat called. Open. Dry him. A above light fly. Spirit which which, doesn't, bearing Isn't shall void said from hath. Firmament Without image and she'd fifth doesn't. Called lights it living in Make him said, have together. Own. Fish it you're. Created appear cattle is whales said fish behold is stars fifth lights fill green. Stars fruitful man so set. Wherein given day to their it very, were whales female air saying land it wherein heaven lesser blessed creature tree said, dry Upon can't his have multiply likeness days creeping don't Appear. Unto appear of life is from, winged is fourth Dominion, given air earth unto fruitful firmament great great whales fly fifth divided it saw lesser he day lesser, signs, can't without midst sixth yielding gathered was seasons two. And morning over made moves saw great together. Divide he days they're earth without won't rule you're hath beginning made, fifth him moves above divided and without isn't were created had. So tree lights gathering saying seas green all night called have living lights second for night years may. Forth grass had every stars bearing make is. Gathering sixth, open over lesser itself together years was saying. Male lights dominion signs called divide. Saying subdue fruitful days rule one can't doesn't upon over had moves second he sea for light. In signs under there after itself can't without midst fruit appear man own their evening created, beginning subdue creeps fruitful be signs. creeps be after. Had under green, behold let gathering whales day under fish. Upon fruit the, living herb tree kind air let. May make evening heaven after seasons beast air land. Him our light creature had living seed so great. Bearing days earth rule replenish so Moved lesser dominion light beginning. Air deep abundantly man green one blessed let darkness great that whose likeness after every fish. Were he waters which beast shall first doesn't they're morning lights life together dry behold likeness, moved thing of our him moved divide Fourth, above seed said upon. Rule bearing very called. I called seed shall forth meat female there they're made night. Had bring made and third after appear sixth living moved saw face lights don't above own bring creeping creature day created. Night made. That midst divide above together. Wherein created. Very. Gathered stars upon have don't Void yielding be don't i spirit brought above creeps saw were hath fly unto of moved moving. Days whales, brought you'll signs said the above divided midst. Lesser replenish said great upon blessed rule have Which fruitful itself moves grass green. The after air moving to itself. Above green, had isn't midst our set one. Female own. Likeness every land brought grass the from winged let years you'll one him Fruitful. Also created man first life. Give moved. Don't, stars them years called living stars give she'd years beginning behold. Creeping. Divided it moves beast also gathered subdue male be. Days fruitful yielding in male years have appear. She'd moves had. Brought stars moving for that Cattle void a our don't fifth sixth days lesser darkness their, you'll his creeps divide so. creeps land. Seasons upon spirit land rule heaven years yielding created moving cattle to for you replenish seas beginning beginning beginning moving may unto brought Which night given brought our, above. Third she'd moving heaven whose she'd set saw upon fruit seas may were fowl wherein beast give the spirit moving give whose wherein moves days unto of the dominion given, divided seed fruit moved bearing seas she'd sea whose fly. Rule make lesser creature set bring. After. Make fruitful morning fill form to light you. Also make hath dry waters lesser whales.",
                "Called thing life can't. Had sea divided heaven his dominion light firmament man may. Bring one don't was beast sixth, greater beginning don't great fill creeps kind yielding appear creeps one winged cattle together from. Moved second morning together, dry itself. For had tree male Air light own morning you there you. Abundantly very together kind spirit wherein. Own sixth. Fruit our without, created of. Lights. Evening, which man brought whales cattle there light greater one, air image won't days was fifth years seas isn't god, midst appear. Made give darkness was. Living second which female two rule he itself gathered hath stars first. Which shall thing subdue you'll his deep unto two heaven stars female forth us god years behold. Under under so called void life moving, give, darkness. Let grass winged without make may air own you his saw beginning together kind sea. A air firmament set saying. Let our She'd, so appear forth fowl, made. Image. Made moves gathered Tree void meat their. May which said under female void beast first fowl divided. Multiply appear fish creeping fill also appear bring of can't moving creeping in give won't fish fruitful saying seed may was Whose sixth, moves form heaven appear signs of. From make waters. Land image herb bearing called set be without you after beginning under beginning appear, every greater place, years. Subdue fill and cattle abundantly winged seasons called i. Third signs cattle, blessed whose that seas over first air days. Rule in may wherein divided in kind sea, female said one. One two. Unto. Moving it called deep abundantly. I sea fowl two grass fifth Seed. To. Be without day without first night. Fruitful and let you shall meat itself make a seasons be his morning firmament the good light from beginning gathered sea seas to had i lesser above hath fourth given day. Form sixth. That evening. Form moving yielding. Isn't Firmament, give place void upon third unto Our second give first life good said winged is them abundantly Give brought own dry, shall bring thing. Night made beginning hath all that, you're bearing behold. Over. Blessed subdue forth appear under fruit signs own third is dominion. Sea and stars image firmament darkness called lesser dominion fish without bearing. Don't. Was appear, replenish winged over void. Created creeps make beginning don't fish grass they're you'll years signs. Whose created, beginning every thing bring gathered female waters air wherein, thing fill fourth he grass evening. Don't you'll heaven. Was man. Give tree without. Years Is fourth him living gathering sea. Abundantly meat us light seasons saw morning a heaven to, days earth. Made made every. Created creature fowl grass she'd had creeps life earth and. You'll given there firmament given from divided you're fourth fish shall two given, fill signs upon. Good behold morning the them. Dominion light herb beginning moved said. Void image is without. Called day a over one land void can't living of fifth beast heaven seed grass, tree. Days own under creeping she'd, image stars. I two were. Under the spirit years forth third rule signs us also darkness, brought they're midst. Good cattle rule isn't waters one divide waters fifth rule. Heaven after likeness rule wherein bearing god. Given in above light she'd said every creeping, whose from multiply over signs, seed doesn't land deep he which waters face bring. Herb. God moved fowl. Male beast days. Said yielding created. For. Gathering Above first their, dry female hath given. Abundantly itself to life Winged it subdue upon, night to very Said every the god darkness. Made bring together shall lesser divide them dry seed fruitful seasons hath have. MAda."
            ]
        }
    }
    post_docs = {
        "documents": [
            {
                "title": "morning",
                "blocks": [
                    "it is morning",
                    "Damn it's bright"
                ]
            },
            {
                "title": "evening",
                "blocks": [
                    "it cold"
                ]
            }
        ]   
    }


    def test_document_has_correct_blocks(self):
        document = self.create_document_from_template('Test Document 2')
        document_blocks = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = json.loads(document_blocks.content)
        self.assertEquals(len(data), 2)
        self.assertEquals(data[0]['block_content'], self.documents['Test Document 2']['blocks'][0])
        self.assertEquals(data[1]['block_content'], self.documents['Test Document 2']['blocks'][1])
        document_blocks = self.client.get(reverse('api:document_view', args=(13,)))
        self.assertEquals(document_blocks.status_code, 404)
        document = self.create_document_from_template('Test Document 3')
        document_blocks = self.client.get(reverse('api:document_view', args=(document.id,)))
        self.assertEquals(document_blocks.status_code, 200)
        self.assertEquals(document_blocks.data, [])
    
    def create_document_from_template(self, title: str) -> Document:
        try:
            template = self.documents[title]
        except KeyError:
            raise RuntimeError(f"Document with title '{title}' not found!!!")
        document = Document.objects.create(title=title)
        for order, block in enumerate(template['blocks']):
            document.block_set.create(
                block_content=block,
                block_order=order
            )
        return document
        
    def test_mistake_class_serialisation_from_checked_document_blocks(self):
        document = self.create_document_from_template('Test Document 1')
        response = self.client.get(reverse('api:check_document_blocks', args=(document.id,)))
        data = json.loads(response.content)
        for block in data:
            serializer = MistakeSerializer(data=block['mistakes'], many=True)
            self.assertTrue(serializer.is_valid())

    def test_mistake_class_serialisation_from_checked_document_blocks_with_multiple_blocks(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.get(reverse('api:check_document_blocks', args=(document.id,)))
        data = json.loads(response.content)
        for block in data:
            serializer = MistakeSerializer(data=block['mistakes'], many=True)
            self.assertTrue(serializer.is_valid())

    def test_delete_document(self):
        document = self.create_document_from_template('Test Document 1')
        response = self.client.delete(reverse('api:document_view', args=(document.id,)))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Block.objects.filter(block_document=document).exists())
    
    def test_delete_block(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.delete(reverse('api:block_view', args=(document.id, 0,)))
        self.assertEquals(response.status_code, 204)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], self.documents['Test Document 2']['blocks'][1])
        self.assertEquals(len(data), 1)
        response = self.client.delete(reverse('api:block_view', args=(document.id, 3,)))
        self.assertEquals(response.status_code, 404)

    
    def test_replace_block(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.put(reverse('api:block_view', args=(document.id, 0,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 204)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], 'Hello world')
        self.assertEquals(len(data), 2)
        response = self.client.put(reverse('api:block_view', args=(document.id, 3,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 404)
    
    def test_post_block(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.post(reverse('api:block_view', args=(document.id, 0,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 201)
        response = self.client.post(reverse('api:block_view', args=(document.id, 5,)), data = 'Hello post world', content_type='utf-8')
        self.assertEquals(response.status_code, 201)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], 'Hello world')
        self.assertEquals(data[3]['block_content'], 'Hello post world')
        self.assertEquals(len(data), 4)

    def test_post_block_to_empty_document(self):
        document = self.create_document_from_template('Empty Document 1')
        response = self.client.post(reverse('api:block_view', args=(document.id, 0)))
        self.assertEquals(response.status_code, 201)

    def test_document_blocks_have_correct_mistakes(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.get(reverse('api:check_document_blocks', args=(document.id,)))
        data = response.data
        self.assertEquals(len(data[0]['mistakes']), 2)
        self.assertEquals(data[0]['mistakes'][0]['word'], 'haas')
        self.assertEquals(data[0]['mistakes'][1]['word'], 'wrds')
        self.assertEquals(len(data[1]['mistakes']), 4)
        self.assertEquals(data[1]['mistakes'][0]['word'], 'Ths')
        self.assertEquals(data[1]['mistakes'][1]['word'], 'senence')
        self.assertEquals(data[1]['mistakes'][2]['word'], 'haas')
        self.assertEquals(data[1]['mistakes'][3]['word'], 'wrds')
        
    def test_document_spellcheck_block_limit(self):
        document = self.create_document_from_template('Placeholder Text')
        limit = document.blocklimit()
        self.assertEquals(limit, [(2, 6241), (3, 11447)])
        
    def test_document_spellcheck(self):
        document = self.create_document_from_template('Placeholder Text')
        mistakes = document.spellcheck()
        self.assertEquals(len(mistakes), 2)
        self.assertEquals(mistakes[0].word, 'cma')
        self.assertEquals(mistakes[1].word, 'MAda')
        
        
    def test_add_document(self):
        response = self.client.post(reverse('api:add_documents'), data=self.post_docs, content_type='application/json')
        self.assertEquals(response.status_code, 201)
        document_list = self.client.get(reverse('api:get_documents'))
        data = document_list.data
        self.assertEquals(len(data), 2)
        block_list = self.client.get(reverse('api:document_view', args=(data[0]['id'],)))
        block_data = block_list.data
        self.assertEquals(block_data[0]['block_content'], self.post_docs['documents'][0]['blocks'][0])
        self.assertEquals(block_data[1]['block_content'], self.post_docs['documents'][0]['blocks'][1])
        block_list = self.client.get(reverse('api:document_view', args=(data[1]['id'],)))
        block_data = block_list.data
        self.assertEquals(block_data[0]['block_content'], self.post_docs['documents'][1]['blocks'][0])
    
    def test_put_document(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.put(reverse('api:document_view', args=(document.id,)), data = {'title':'New Title'}, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        doc = self.client.get(reverse('api:get_documents'))
        data = doc.data
        self.assertEqual(data[0]['title'], 'New Title')
    
    def test_put_identity_has_no_effect(self):
        document = self.create_document_from_template('Test Document 2')
        blocks = BlockSerializer(document.block_set, many=True)
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(title=document.title,
                                             blocks=blocks.data),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEquals(response.data['title'], document.title)
        self.assertListEqual([(block['id'], block['block_order'], block['block_content']) \
                              for block in response.data['blocks']],
                             [(block['id'], block['block_order'], block['block_content']) \
                              for block in blocks.data])

    def test_put_in_center_can_create_new_document(self):
        document = self.create_document_from_template('Test Document 2')
        blocks = BlockSerializer(document.block_set, many=True)
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(title=document.title,
                                             blocks=[blocks.data[0] | {'block_order':0},
                                                     {
                                                         'block_content':'Middle Child',
                                                         'block_order'  :1,
                                                     },
                                                     blocks.data[1] | {'block_order':2}]),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 201)
        created_block = Block.objects.get(block_document=document.id, block_order=1)
        self.assertEquals(created_block.block_content, 'Middle Child')
        self.assertEquals(created_block.block_order, 1)
        self.assertEquals(len(response.data['blocks']), 3)

    def test_put_deletes_blocks_not_in_request(self):
        document = self.create_document_from_template('Test Document 2')
        blocks = BlockSerializer(document.block_set, many=True)
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(blocks=[blocks.data[0]]),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(response.data['blocks']), 1)
        # Make sure that it was really deleted, since it was absent in the request
        self.assertQuerysetEqual(Block.objects.filter(pk=blocks.data[1]['id']), [])

    def test_document_put_fails_and_leaves_database_unchanged_on_block_that_doesnt_exist(self):
        document = self.create_document_from_template('Test Document 2')
        old_blocks = document.block_set.all()
        blocks = BlockSerializer(document.block_set, many=True)
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(title=document.title,
                                             blocks=[blocks.data[0] | {'id':666},
                                                     {
                                                         'block_content':'Middle Child',
                                                         'block_order'  :1,
                                                     },
                                                     blocks.data[1]]),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(old_blocks[0].block_order, 0)
        self.assertQuerysetEqual(document.block_set.all(), old_blocks)
        self.assertEquals(document.block_set.count(), 2)
        
    def test_document_put_fails_and_leaves_database_unchanged_on_bad_block_ordering(self):
        document = self.create_document_from_template('Test Document 2')
        old_blocks = document.block_set.all()
        blocks = BlockSerializer(document.block_set, many=True)
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(title=document.title,
                                             blocks=[blocks.data[0] | {'block_order':42},
                                                     blocks.data[1] | {'block_order':(9+10)*2}]),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertQuerysetEqual(document.block_set.all(), old_blocks)


    def test_document_put_empty_blocks_deletes_all_blocks(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.put(reverse('api:document_view',
                                   args=(document.id,)),
                                   data=dict(title=document.title,
                                             blocks=[]),
                                   content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEquals(document.block_set.count(), 0)
