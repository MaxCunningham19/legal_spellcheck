# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from .models import *
from .serializers import MistakeSerializer
import json

class ApiTester(TestCase):
    documents = {
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
        }
    }


    def test_document_has_correct_blocks(self):
        document = self.create_document_from_template('Test Document 2')
        document_blocks = self.client.get(reverse('api:get_document_blocks', args=(document.id,)))
        data = json.loads(document_blocks.content)
        self.assertEquals(len(data), 2)
        self.assertEquals(data[0]['block_content'], self.documents['Test Document 2']['blocks'][0])
        self.assertEquals(data[1]['block_content'], self.documents['Test Document 2']['blocks'][1])
    
    def create_document_from_template(self, title):
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

    def test_put_document(self):
        data = {
            'Test Document 3': {
                'blocks': [
                    "This sjhjljlhjkjkl haas two incorrect wrds",
                    "Ths senence haas four incorrect wrds"
                ]
            }
        }
        document = self.create_document_from_template('Test Document 1')
        response = self.client.put(reverse('api:put_document_blocks', data))
        self.assertEqual(response.status_code, 200)
        doc = json.loads(response.content)
        doc_str = json.dumps(doc)
        self.assertEqual(Block.objects.filter(block_document=doc_str).exists())

    def test_delete_document(self):
        document = self.create_document_from_template('Test Document 1')
        response = self.client.delete(reverse('api:delete_document_blocks', args=(document.id,)))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Block.objects.filter(block_document=document).exists())

    def test_post_document(self):
        data = {
            'Test Document 3': {
                'blocks': [
                    "This sjhjljlhjkjkl haas two incorrect wrds",
                    "Ths senence haas four incorrect wrds"
                ]
            }
        }
        document = self.create_document_from_template('Test Document 1')
        response = self.client.post(reverse('api:post_documents', data))
        self.assertEqual(response.status_code, 201)
        doc = json.loads(response.content)
        doc_str = json.dumps(doc)
        self.assertEqual(Block.objects.filter(block_document=doc_str).exists())
            
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

