import { Router } from 'express';
import {testAptitudController} from '../controllers/test-aptitudcontroller';

class TestAptitudRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',testAptitudController.list);
// this.router.get('/:id',testAptitudController.getOne);
// this.router.post('/',testAptitudController.create);
// this.router.delete('/:id',testAptitudController.delete);
// this.router.put('/:id',testAptitudController.update);

}
}
const testAptitudRoutes=new TestAptitudRoutes();
export default  testAptitudRoutes.router;