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
        response = self.client.delete(reverse('api:document_block_view', args=(document.id, 0,)))
        self.assertEquals(response.status_code, 204)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], self.documents['Test Document 2']['blocks'][1])
        self.assertEquals(len(data), 1)
        response = self.client.delete(reverse('api:document_block_view', args=(document.id, 3,)))
        self.assertEquals(response.status_code, 404)

    
    def test_replace_block(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.put(reverse('api:document_block_view', args=(document.id, 0,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 204)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], 'Hello world')
        self.assertEquals(len(data), 2)
        response = self.client.put(reverse('api:document_block_view', args=(document.id, 3,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 404)
    
    def test_post_block(self):
        document = self.create_document_from_template('Test Document 2')
        response = self.client.post(reverse('api:document_block_view', args=(document.id, 0,)), data = 'Hello world', content_type='utf-8')
        self.assertEquals(response.status_code, 201)
        response = self.client.post(reverse('api:document_block_view', args=(document.id, 5,)), data = 'Hello post world', content_type='utf-8')
        self.assertEquals(response.status_code, 201)
        doc_data = self.client.get(reverse('api:document_view', args=(document.id,)))
        data = doc_data.data
        self.assertEquals(data[0]['block_content'], 'Hello world')
        self.assertEquals(data[3]['block_content'], 'Hello post world')
        self.assertEquals(len(data), 4)

    def test_post_block_to_empty_document(self):
        document = self.create_document_from_template('Empty Document 1')
        response = self.client.post(reverse('api:document_block_view', args=(document.id, 0)))
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

    def test_documents_post_returns_document_structure(self):
        response = self.client.post(reverse('api:add_documents'),
                                    data=dict(documents=[self.post_docs['documents'][0]]),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['documents'][0]['title'],
                         self.post_docs['documents'][0]['title'])
        self.assertEqual(len(response.data['documents'][0]['blocks']),
                         len(self.post_docs['documents'][0]['blocks']))
        

    def test_put_block_content(self):
        document = self.create_document_from_template('Test Document 1')
        blocks = document.block_set.all()
        response = self.client.put(reverse('api:block', args=(blocks[0].id,)),
                                   data=dict(block_content="I'll be back"),
                                   content_type="application/json")
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.data['block_content'], "I'll be back")
        self.assertEqual(document.block_set.all()[0].block_content, "I'll be back")

    def test_get_block(self):
        document = self.create_document_from_template('Test Document 1')
        blocks = document.block_set.all()
        response = self.client.get(reverse('api:block', args=(blocks[0].id,)))
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.data['block_content'], blocks[0].block_content)

    def test_delete_block(self):
        document = self.create_document_from_template('Test Document 1')
        blocks = document.block_set.all()
        response = self.client.delete(reverse('api:block', args=(blocks[0].id,)))
        self.assertEquals(response.status_code, 204)
        self.assertQuerysetEqual(document.block_set.all(), [])


    def test_insert_after_block(self):
        document = self.create_document_from_template('Test Document 2')
        [first, second] = document.block_set.all()
        response = self.client.post(reverse('api:add_blocks'),
                             data=dict(block_content="Ω",
                                       block_order={'after':first.id},
                                       block_document=document.id),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 201)
        self.assertEquals(document.block_set.count(), 3)
        self.assertEquals(document.block_set.get(block_order=1).block_content, "Ω")
        self.assertEquals(response.data['block_content'], "Ω")

    def test_insert_before_block(self):
        document = self.create_document_from_template('Test Document 2')
        [first, second] = document.block_set.all()
        response = self.client.post(reverse('api:add_blocks'),
                             data=dict(block_content="Alpha",
                                       block_order={'before':first.id},
                                       block_document=document.id),
                                    content_type="application/json")
        self.assertEquals(response.status_code, 201)
        self.assertEquals(document.block_set.count(), 3)
        self.assertEquals(document.block_set.get(block_order=0).block_content, "Alpha")
        self.assertEquals(response.data['block_content'], "Alpha")
        
        
